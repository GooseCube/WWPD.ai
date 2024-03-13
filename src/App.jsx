// React
import { useState } from "react";

// Context Providers
import { useShow } from "./components/contextProviders/ShowProvider";

// Components
import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Agents from "./components/agents/Agents";
import AgentCards from "./components/agentCards/AgentCards";
import MessageInterface from "./components/messages/MessageInterface";
import EmailForm from "./components/email/Email";
import MomentsEditor from "./components/momentsEditor/MomentsEditor";

function App() {
  const { show } = useShow();
  const [loggedIn, setLoggedIn] = useState(false);
  const [moment, setMoment] = useState({});

  const handleEmail = (e, selectedMoment) => {
    e.preventDefault();
    setMoment(selectedMoment);
  };

  return loggedIn ? (
    <div className="app-container">
      <Sidebar />
      <div className="game-container">
        <MessageInterface handleEmail={handleEmail} />
        <Agents />
      </div>
      <EmailForm moment={moment} />
      <AgentCards />
      {show.momentsEditor && <MomentsEditor />}
    </div>
  ) : (
    <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  );
}

export default App;
