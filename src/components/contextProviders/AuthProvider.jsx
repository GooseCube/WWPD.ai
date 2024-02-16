/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";

// Firebase Initial Configuration
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

/**
 * context: {email, uid, displayName, photoURL}
 */
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [uid, setUid] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  // const [photoUrl, setPhotoURL] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        setEmail(user.email);
        setUid(user.uid);
        setDisplayName(user.displayName);
        // setPhotoURL(user.photoURL);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, email, uid, displayName }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
