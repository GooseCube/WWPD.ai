import { useState } from "react";
import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Agents from "./components/agents/Agents";
import AgentCards from "./components/agentCards/AgentCards";
import MessageInterface from "./components/messages/MessageInterface";
import EmailForm from "./components/email/Email";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAgentCards, setShowAgentCards] = useState(false);
  const [moment, setMoment] = useState({});

  const handleEmail = (e, selectedMoment) => {
    e.preventDefault();
    setMoment(selectedMoment);
  };

  return loggedIn ? (
    <div className="app-container">
      <Sidebar
        showAgentCards={showAgentCards}
        setShowAgentCards={setShowAgentCards}
      />
      <MessageInterface handleEmail={handleEmail} />
      <EmailForm moment={moment} />
      <Agents />
      {showAgentCards && <AgentCards setShowAgentCards={setShowAgentCards} />}
    </div>
  ) : (
    <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  );
}

export default App;
