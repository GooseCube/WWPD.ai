/* eslint-disable react/prop-types */
/**
To use this boolean flag global context provider:

EXAMPLE:

import { useShow } from './ShowContext';

function SomeComponent() {
  const { show, dispatch } = useShow();

  const handleClick = () => {
    dispatch({ type: 'SET_INTERFACE', payload: !show.interface });
  };

  // ... rest of your code
}
*/
import { createContext, useReducer, useContext } from "react";

const ShowContext = createContext();

const initialState = {
  interface: true,
  emailForm: false,
  agentCards: false,
};

function showReducer(state, action) {
  switch (action.type) {
    case "SET_INTERFACE":
      return { ...state, interface: action.payload };
    case "SET_EMAIL_FORM":
      return { ...state, emailForm: action.payload };
    case "SET_AGENT_CARDS":
      return { ...state, agentCards: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function ShowProvider({ children }) {
  const [show, dispatch] = useReducer(showReducer, initialState);

  return (
    <ShowContext.Provider value={{ show, dispatch }}>
      {children}
    </ShowContext.Provider>
  );
}

export function useShow() {
  const context = useContext(ShowContext);
  if (context === undefined) {
    throw new Error("useShow must be used within a ShowProvider");
  }
  return context;
}
