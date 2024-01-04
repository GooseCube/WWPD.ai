import React, { useState, useEffect, createContext } from "react";
import { getUserMessages, getUserMoments, initializeAgents } from "./firebaseDB";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageRefs, setMessageRefs] = useState([]);
  const [moments, setMoments] = useState([]);
  const [momentRefs, setMomentRefs] = useState([]);
  const [agents, setAgents] = useState([]);
  const [agentRefs, setAgentRefs] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        initializeAgents(setAgents, setAgentRefs);
        getUserMessages(setMessages, setMessageRefs);
        getUserMoments(setMoments, setMomentRefs);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, messages, moments, agents, setAgents }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
