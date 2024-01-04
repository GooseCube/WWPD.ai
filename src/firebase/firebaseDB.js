import {
  update,
  remove,
  ref,
  push,
  set,
  onDisconnect,
  onValue,
} from "firebase/database";
import { database, auth } from "./firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { personas } from "../personas/personas";

// Called from AuthProvider | Initialize All Agents in Game
export const initializeAgents = async (setAgents, setAgentRefs) => {
  const userId = auth.currentUser.uid;
  const agentsRef = ref(database, `users/${userId}/agents`);

  Object.values(personas).map((agent) => {
    const agentId = uuidv4();
    agent.uid = agentId;

    const agentRef = ref(database, `users/${userId}/agents/${agentId}`);
    set(agentRef, agent);
    setAgents((prev) => [...prev, agent]);
    setAgentRefs((prev) => [...prev, agentRef]);
  });

  // Remove agent from Firebase when user disconnects
  onDisconnect(agentsRef).remove((error) => {
    if (error) {
      console.error("Unable to remove agent on disconnect");
    }
  });
};

// Called from /player -> keyPressListener module
export const updateAgent = async (agent) => {
  const userId = auth.currentUser.uid;
  const agentRef = ref(database, `users/${userId}/agents/${agent.uid}`);
  update(agentRef, agent);
};

// Called from AuthProvider
export const getUserMessages = async (setMessages, setMessageRefs) => {
  const userId = auth.currentUser.uid;
  const messageRefs = ref(database, `users/${userId}/messages`);
  onValue(messageRefs, (snapshot) => {
    const messages = snapshot.val();
    setMessageRefs(messageRefs);
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

export const removeMessage = async (id) => {
  const userId = auth.currentUser.uid;
  const messageRef = ref(database, `users/${userId}/messages/${id}`)
  await remove(messageRef);
}
