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
  // const agentsRef = ref(database, `users/${userId}/agents`);

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
    onValue(agentRef, (snapshot) => {
      const updatedAgent = snapshot.val();
      setAgents((prevAgents) => {
        return prevAgents.map((a) => (a.uid === agent.uid ? updatedAgent : a));
      });
    });
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
      const agents = snapshot.val();
      setAgents(Object.values(agents));
      return;
    }
  }

  // If agents exist, then establish an event listener on each agent.
  agents.forEach((agent) => {
    const agentRef = ref(database, `users/${userId}/agents/${agent.uid}`);
    onValue(agentRef, (snapshot) => {
      const updatedAgent = snapshot.val();
      setAgents((prevAgents) => {
        return prevAgents.map((a) => (a.uid === agent.uid ? updatedAgent : a));
      });
    });
  });
};

// Update Firebase agent properties
export const updateAgent = async (agent) => {
  const userId = auth.currentUser.uid;
  const agentRef = ref(database, `users/${userId}/agents/${agent.uid}`);
  update(agentRef, agent);
};