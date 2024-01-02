import React, { useState, useEffect, createContext } from "react";
import { database, auth } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [agents, setAgents] = useState([]); // New state for agents

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  useEffect(() => {
    if (currentUser) {
      const userId = auth.currentUser.uid;

      // Fetch messages from Firebase
      const messagesRef = ref(database, `users/${userId}/messages`);
      const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const list = [];
        for (let id in data) {
          list.push({ id, ...data[id] });
        }
        setMessages(list);
      });

      // Fetch agents from Firebase
      const agentsRef = ref(database, `users/${userId}/agents`); // New reference for agents
      const unsubscribeAgents = onValue(agentsRef, (snapshot) => {
        // New listener for agents
        const data = snapshot.val();
        const list = [];
        for (let id in data) {
          list.push({ id, ...data[id] });
        }
        setAgents(list); // Set the agents state
      });

      return () => {
        unsubscribeMessages();
        unsubscribeAgents(); // Unsubscribe from agents when component unmounts
      };
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, messages, agents }}>
      {" "}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
