/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";

// Firebase Initial Configuration
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Firebase
import {
  isFirstAgentInitialization,
  initializeAgentsFromPersonas,
  loadAgentsFromFirebase,
} from "../../firebase/firebaseAgents";
import { getUserMessages } from "../../firebase/firebaseMessages";
import { getUserMoments } from "../../firebase/firebaseMoments";
import { getSidebarProperties } from "../../firebase/firebaseSidebar";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [agents, setAgents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [moments, setMoments] = useState([]);
  const [sidebar, setSidebar] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        if (await isFirstAgentInitialization()) {
          await initializeAgentsFromPersonas(setAgents);
        } else {
          await loadAgentsFromFirebase(agents, setAgents);
        }
        await getUserMessages(setMessages);
        await getUserMoments(setMoments);
        await getSidebarProperties(setSidebar);
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
