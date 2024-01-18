import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Agents from "./components/agents/Agents";
import AgentCards from "./components/agentCards/AgentCards";
import MessageInterface from "./components/messages/MessageInterface";
import EmailForm from "./components/email/Email";
import { useState } from "react";
import gameBackground from "./assets/gooseCubeMap_1280x720.png";

const getWidth = () => {
  return (1280 / 10) + "rem";
  // return "1280px"
}

const getHeight = () => {
  return (720 / 10) + "rem";
  // return "720px"
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showInterface, setShowInterface] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showAgentCards, setShowAgentCards] = useState(false);

  return loggedIn ? (
    <div className="app-container" style={{backgroundImage: `url(${gameBackground})`, width: getWidth(), height: getHeight()}}>
    {/* <div
      className="app-container"
      style={{ backgroundImage: `url(${gameBackground})` }}> */}
      <Sidebar
        showInterface={showInterface}
        setShowInterface={setShowInterface}
        showEmailForm={showEmailForm}
        setShowEmailForm={setShowEmailForm}
        showAgentCards={showAgentCards}
        setShowAgentCards={setShowAgentCards}
      />
      <MessageInterface
        showInterface={showInterface}
        setShowInterface={setShowInterface}
        showEmailForm={showEmailForm}
        setShowEmailForm={setShowEmailForm}
      />
      <EmailForm
        showEmailForm={showEmailForm}
        setShowEmailForm={setShowEmailForm}
      />
      <Agents />
      {showAgentCards && (
        <AgentCards
          showAgentCards={showAgentCards}
          setShowAgentCards={setShowAgentCards}
        />
      )}
    </div>
  ) : (
    <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  );
}

export default App;
