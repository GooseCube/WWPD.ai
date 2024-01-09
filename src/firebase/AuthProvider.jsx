import React, { useState, useEffect, createContext } from "react";

// Firebase Initial Configuration
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// FirebaseDB
import {
  getSidebarProperties,
  getUserMessages,
  getUserMoments,
  initializeAgents,
} from "./firebaseDB";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [agents, setAgents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [moments, setMoments] = useState([]);
  const [sidebar, setSidebar] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        initializeAgents(setAgents);
        getUserMessages(setMessages);
        getUserMoments(setMoments);
        getSidebarProperties(setSidebar)
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, agents, setAgents, messages, moments, sidebar }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
