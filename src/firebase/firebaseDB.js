import { update, remove, ref, push, set } from "firebase/database";
import { database, auth } from "./firebaseConfig";
import { v4 as uuidv4 } from "uuid";

/**
 * The function will add a new message to users Firebase DB. The push() function from Firebase SDK
 * will add a unique identifier for each message.
 * NOTE: 'response' should be filtered before pushing to Firebase. Each AI Model
 * has a unique method of filtering for the response. Add the responseFilter() method
 * in the modelAPI query/response function.
 * @param {string} prompt
 * @param {string} response
 */
export const pushNewMessage = async function addNewMessageToFirebaseDB(
  prompt,
  response
) {
  const message = {
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

// Remove all Player/Agents data
export const removeAllAgents = async (userId) => {
  const agentsRef = ref(database, `users/${userId}/agents`);
  try {
    await remove(agentsRef);
    console.log("All agents removed from Firebase for user: ", userId);
  } catch (error) {
    console.log("Unable to remove agents from Firebase for user: ", userId);
  }
};

// Initialize All Agents in Game
export const initializeAgent = async (agent, userId) => {
  agent.uid = uuidv4();
  const agentsRef = ref(database, `users/${userId}/agents`);
  const newAgentRef = push(agentsRef);
  try {
    await set(newAgentRef, agent);
    console.log("New Agent Pushed to Firebase: ", agent);
  } catch (error) {
    console.log("Unable to push new Agent to Firebase: ", agent);
  }
};

// Update Agent Data
export const updateExistingAgentData = async (agent, userId) => {
  // const userId = auth.currentUser.uid;
  const agentRef = ref(database, `users/${userId}/agents/${agent.uid}`);
  try {
    await update(agentRef, agent);
    console.log("Agent Updated in Firebase: ", agent);
  } catch (error) {
    console.log("Unable to update Agent in Firebase: ", error);
  }
};
