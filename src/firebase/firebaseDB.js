import {
  update,
  remove,
  ref,
  push,
  set,
  onDisconnect,
  onValue,
  get,
} from "firebase/database";
import { database, auth } from "./firebaseConfig";
import { v4 as uuidv4 } from "uuid";

// Personas for each agent, used to create Firebase agents
import { personas } from "../modules/personas/personas";
import { agentRenderPositions } from "../modules/mapGridPositions/agentRenderPositions";

// ---------- Firebase Agents ------------

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

/**
 * Evaluate if agents exist in Firebase
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
 * Loads the agents from /personas array in static file
 * if this is the first time logging in.
 * @param {useState Setter} setAgents
 */
export const initializeAgentsFromPersonas = async (setAgents) => {
  const userId = auth.currentUser.uid;
  const agentsRef = ref(database, `users/${userId}/agents`);

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

// Update Firebase agent properties
export const updateAgent = async (agent) => {
  const userId = auth.currentUser.uid;
  const agentRef = ref(database, `users/${userId}/agents/${agent.uid}`);
  update(agentRef, agent);
};

// ---------- Firebase Messages ------------

// Called from AuthProvider to retrieve user persisted messages
export const getUserMessages = async (setMessages) => {
  const userId = auth.currentUser.uid;
  const messageRefs = ref(database, `users/${userId}/messages`);
  onValue(messageRefs, (snapshot) => {
    const messages = snapshot.val();
    setMessages(messages);
  });
};

/**
 * The function will add a new message to users Firebase DB. The push() function from Firebase SDK
 * will add a unique identifier for each message.
 * NOTE: 'response' should be filtered before pushing to Firebase. Each AI Model
 * has a unique method of filtering for the response. Add the responseFilter() method
 * in the modelAPI query/response function.
 * @param {string} prompt
 * @param {string} response
 */
export const pushNewMessage = async (prompt, response, agent) => {
  const message = {
    agent: agent,
    prompt: prompt,
    response: response,
    timestamp: Date.now(),
  };
  const userId = auth.currentUser.uid;
  const messagesRef = ref(database, `users/${userId}/messages`);
  const newMessageRef = push(messagesRef);

  try {
    await set(newMessageRef, message);
    console.log("New Message Pushed to Firebase: ", message);
  } catch (error) {
    console.log("Unable to push new message to Firebase: ", error);
  }
};

/**
 * Given the message id, removes the message from Fireabse
 * @param {number} id of message in Firebase
 */
export const removeMessage = async (id) => {
  const userId = auth.currentUser.uid;
  const messageRef = ref(database, `users/${userId}/messages/${id}`);
  await remove(messageRef);
};

// ---------- Firebase Moments ------------

/**
 * Retrieve the firebase 'moments', if any
 * @param {useState setter} setMoments
 */
export const getUserMoments = async (setMoments) => {
  const userId = auth.currentUser.uid;
  const momentRefs = ref(database, `users/${userId}/moments`);
  onValue(momentRefs, (snapshot) => {
    const moments = snapshot.val();
    setMoments(moments);
  });
};

/**
 * Update firebase with a new 'moment' creation
 * @param {string} prompt
 * @param {string} response
 */
export const pushNewMoment = async (conversation) => {
  const moment = {
    timestamp: Date.now(),
    conversation: conversation,
  };
  const userId = auth.currentUser.uid;
  const momentsRef = ref(database, `users/${userId}/moments`);
  const newMomentsRef = push(momentsRef);

  try {
    await set(newMomentsRef, moment);
    console.log("New Moment Pushed to Firebase: ", moment);
  } catch (error) {
    console.log("Unable to push new moment to Firebase: ", error);
  }
};

/**
 * Using the specific id for the 'moment', remove it from Firebase
 * @param {uuidv4} id
 */
export const removeMoment = async (id) => {
  const userId = auth.currentUser.uid;
  const momentsRef = ref(database, `users/${userId}/moments/${id}`);
  await remove(momentsRef);
};

// ---------- Firebase Sidebar ------------

/**
 * Retrieve sidebar properties such as AI Model currently selected
 * @param {useState Setter} setSidebar
 */
export const getSidebarProperties = async (setSidebar) => {
  const userId = auth.currentUser.uid;
  const sidebarRefs = ref(database, `users/${userId}/sidebar`);
  onValue(sidebarRefs, (snapshot) => {
    let sidebar = snapshot.val();
    if (!sidebar) {
      sidebar = {};
    }
    if (!sidebar.aiModel) {
      sidebar.aiModel = "Mixtral";
    }
    setSidebar(sidebar);
    console.log("AI Model Set As: ", sidebar);
  });
};

/**
 * Expects that the sidebar properties are already set when
 * passed for update. If a property is excluded when passed
 * then it will be removed on update.
 * @param {object} sidebar
 */
export const updateSidebar = async (sidebar) => {
  const userId = auth.currentUser.uid;
  const sidebarRef = ref(database, `users/${userId}/sidebar`);
  update(sidebarRef, sidebar);
};
