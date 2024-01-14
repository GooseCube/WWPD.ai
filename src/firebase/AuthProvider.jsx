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
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);
  const [agents, setAgents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [moments, setMoments] = useState([]);
  const [sidebar, setSidebar] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await initializeAgents(setAgents);
        await getUserMessages(setMessages);
        await getUserMoments(setMoments);
        await getSidebarProperties(setSidebar)
        setLoading(false)
      }
      else {
        setLoading(false)
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
