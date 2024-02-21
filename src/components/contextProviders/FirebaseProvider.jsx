/* eslint-disable react/prop-types */

import { useState, useEffect, createContext, useContext } from "react";

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

// Auth
import { AuthContext } from "./AuthProvider";
import {
  getMomentTemplates,
  initializeMomentTemplatesFromFile,
  momentTemplatesExist,
} from "../../firebase/firebaseTemplates";

/**
 * context: {agents, setAgents, messages, moments, sidebar}
 */
export const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [agents, setAgents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [moments, setMoments] = useState([]);
  const [sidebar, setSidebar] = useState([]);
  const [momentTemplates, setMomentTemplates] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (await isFirstAgentInitialization()) {
          await initializeAgentsFromPersonas(setAgents);
        } else {
          await loadAgentsFromFirebase(agents, setAgents);
        }

        if (await momentTemplatesExist()) {
          await getMomentTemplates(setMomentTemplates);
        } else {
          await initializeMomentTemplatesFromFile(setMomentTemplates);
        }

        await getUserMessages(setMessages);
        await getUserMoments(setMoments);
        await getSidebarProperties(setSidebar);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <FirebaseContext.Provider
      value={{
        agents,
        setAgents,
        messages,
        moments,
        sidebar,
        momentTemplates,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
