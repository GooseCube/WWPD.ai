/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from "react";

const ShowContext = createContext();

// If 'showReducer' get larger, move the 'initialState' object
// to the same file with 'showReducer'
const initialState = {
  interface: true,
  emailForm: false,
  agentCards: false,
  messages: true,
  inputArea: true,
  isLoading: false,
  momentsEditor: false,
};

// As the switch statement gets larger:
// move to separate file in /contextProvider/modules
// with the 'initialState' object above
function showReducer(state, action) {
  switch (action.type) {
    case "SET_INTERFACE":
      return { ...state, interface: action.payload };
    case "SET_EMAIL_FORM":
      return { ...state, emailForm: action.payload };
    case "SET_AGENT_CARDS":
      return { ...state, agentCards: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "SET_INPUT_AREA":
      return { ...state, inputArea: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_SHOW_MOMENTS_EDITOR":
      return { ...state, momentsEditor: action.payload };
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

/**
 * Pull down the global boolean flags for use in your component
 * Default: { interface: true, emailForm: false, agentCards: false,
 * messages: true, inputArea: true, isLoading: false }
 * FOR DETAILS -> README.md in "/src/components/contextProviders" for use example
 */
export function useShow() {
  const context = useContext(ShowContext);
  if (context === undefined) {
    throw new Error("useShow must be used within a ShowProvider");
  }
  return context;
}
