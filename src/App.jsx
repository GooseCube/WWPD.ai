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
      />
      <EmailForm
        showEmailForm={showEmailForm}
        setShowEmailForm={setShowEmailForm}
      />
      <Agents />
      {showAgentCards && <AgentCards setShowAgentCards={setShowAgentCards} />}
    </div>
  ) : (
    <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  );
}

export default App;
