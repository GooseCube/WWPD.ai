
import React, { useState, useEffect, createContext } from "react";
import { database, auth } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [agents, setAgents] = useState([]);
  const [userId, setUserId] = useState(null); // New state for userId

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setUserId(user ? user.uid : null); // Set userId when user state changes
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
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
      const agentsRef = ref(database, `users/${userId}/agents`);
      const unsubscribeAgents = onValue(agentsRef, (snapshot) => {
        const data = snapshot.val();
        const list = [];
        for (let id in data) {
          list.push({ id, ...data[id] });
        }
        setAgents(list);
      });

      return () => {
        unsubscribeMessages();
        unsubscribeAgents();
      };
    }
  }, [currentUser, userId]); // Add userId as a dependency

  return (
    <AuthContext.Provider value={{ currentUser, messages, agents, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;