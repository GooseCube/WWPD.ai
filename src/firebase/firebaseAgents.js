// See the README in /firebase directory for a list of Functions
import { update, ref, set, onValue, get } from "firebase/database";
import { database, auth } from "./firebaseConfig";
import { v4 as uuidv4 } from "uuid";

// Personas for each agent, used to create Firebase agents on initial load
import { personas } from "../modules/personas/personas";
import { agentRenderPositions } from "../modules/mapGridPositions/agentRenderPositions";

// ---------- Firebase Agents ------------

/**
 * Evaluate if agents exist in Firebase.
 * If return is false, call 'initializeAgentsFromPersonas'
 * If return is true, call 'loadAgentsFromFirebase'
 * @returns  boolean: true if agents exist or false
 * if they have not yet been loaded to firebase
 */
export const isFirstAgentInitialization = async () => {
  const userId = auth.currentUser.uid;
  const agentsRef = ref(database, `users/${userId}/agents`);

  // If agents exist in Firebase, return
  const snapshot = await get(agentsRef);
  if (snapshot.exists()) {
    return false;
  }
  return true;
};

/**
 * Loads the agents from /personas.js
 * if this is the first login and agents do not yet
 * exist in users FirebaseDB.
 * @param {useState Setter} setAgents
 */
export const initializeAgentsFromPersonas = async (setAgents) => {
  const userId = auth.currentUser.uid;

  const assignPositionToAgent = (agent) => {
    const randomIndex = Math.floor(Math.random() * agentRenderPositions.length);
    const position = agentRenderPositions[randomIndex];
    agent.x = position.x;
    agent.y = position.y;
    agent.direction = position.direction;
    agent.homePosition = {
      x: position.x,
      y: position.y,
      direction: position.direction,
    };
    // Remove the used position from the array
    agentRenderPositions.splice(randomIndex, 1);
  };

  Object.values(personas).map((agent) => {
    const agentId = uuidv4();
    agent.uid = agentId;

    assignPositionToAgent(agent);

    const agentRef = ref(database, `users/${userId}/agents/${agentId}`);
    set(agentRef, agent);
    setAgents((prev) => [...prev, agent]);

    // Set up a listener for changes to this agent
    // onValue(agentRef, (snapshot) => {
    //   const updatedAgent = snapshot.val();
    //   setAgents((prevAgents) => {
    //     return prevAgents.map((a) => (a.uid === agent.uid ? updatedAgent : a));
    //   });
    // });
  });
};

/**
 * Loads the agents from Firebase and sets an active listener
 * on changes
 * @param {useState object} agents
 * @param {useState Setter} setAgents
 * @returns
 */
export const loadAgentsFromFirebase = async (agents, setAgents) => {
  const userId = auth.currentUser.uid;
  const agentsRef = ref(database, `users/${userId}/agents`);

  // Check if 'agents' is an empty array
  // and load agents from firebase if true
  if (agents.length === 0) {
    const snapshot = await get(agentsRef);
    if (snapshot.exists()) {
      let agents = snapshot.val();
      // Set momentResponse of each agent to null
      agents = Object.values(agents).map((agent) => ({
        ...agent,
        momentResponse: null,
      }));
      setAgents(agents);
      return;
    }
  }

  // If agents exist, then establish an event listener on each agent.
  agents.forEach((agent) => {
    const agentRef = ref(database, `users/${userId}/agents/${agent.uid}`);
    onValue(agentRef, (snapshot) => {
      const updatedAgent = snapshot.val();
      // Set momentResponse of the updated agent to null
      updatedAgent.momentResponse = null;
      setAgents((prevAgents) => {
        return prevAgents.map((a) => (a.uid === agent.uid ? updatedAgent : a));
      });
    });
  });
};

/**
 * Updates the agent state in Firebase and the global context
 * state in AuthProvider.
 * @param {object} agent AuthProvider context object
 * @param {useState} setAgents function for AuthProvider context
 */
export const updateAgent = async (agent, setAgents = null) => {
  if (!agent || !agent.uid) {
    throw new Error("Invalid agent object");
  }

  const userId = auth.currentUser.uid;
  const agentRef = ref(database, `users/${userId}/agents/${agent.uid}`);

  try {
    await update(agentRef, agent);
  } catch (error) {
    console.error("Error updating agent in database", error);
    throw error;
  }

  if (setAgents) {
    setAgents((prevAgents) => {
      return prevAgents.map((a) => (a.uid === agent.uid ? agent : a));
    });
  }
  else {
    throw new Error("setAgents function is undefined")
  }
};
