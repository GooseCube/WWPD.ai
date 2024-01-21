import { useState } from "react";
import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Agents from "./components/agents/Agents";
import AgentCards from "./components/agentCards/AgentCards";
import MessageInterface from "./components/messages/MessageInterface";
import EmailForm from "./components/email/Email";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showInterface, setShowInterface] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showAgentCards, setShowAgentCards] = useState(false);
  const [moment, setMoment] = useState({});

  const handleEmail = (e, selectedMoment) => {
    e.preventDefault();
    setMoment(selectedMoment);
  };

  return loggedIn ? (
    <div className="app-container">
      <Sidebar
        showInterface={showInterface}
        setShowInterface={setShowInterface}
        showAgentCards={showAgentCards}
        setShowAgentCards={setShowAgentCards}
      />
      <MessageInterface
        showInterface={showInterface}
        setShowInterface={setShowInterface}
        showEmailForm={showEmailForm}
        setShowEmailForm={setShowEmailForm}
        handleEmail={handleEmail}
      />
      <EmailForm
        showEmailForm={showEmailForm}
        setShowEmailForm={setShowEmailForm}
        moment={moment}
      />
      <Agents />
      {showAgentCards && <AgentCards setShowAgentCards={setShowAgentCards} />}
    </div>
  ) : (
    <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  );
}

export default App;
