import { createContext, useState, useContext } from 'react';

const ShowContext = createContext();

export function ShowProvider({ children }) {
  const [show, setShow] = useState({
    interface: true,
    emailForm: false,
    agentCards: false,
  });

  return (
    <ShowContext.Provider value={{ show, setShow }}>
      {children}
    </ShowContext.Provider>
  );
}

export function useShow() {
  const context = useContext(ShowContext);
  if (context === undefined) {
    throw new Error('useShow must be used within a ShowProvider');
  }
  return context;
}