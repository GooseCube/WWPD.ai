import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Agents from "./components/agents/Agents";
import MessageInterface from "./components/messages/MessageInterface";
import EmailForm from "./components/email/Email";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showInterface, setShowInterface] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  return loggedIn ? (
    <div className="app-container">
      <Sidebar
        showInterface={showInterface}
        setShowInterface={setShowInterface}
        showEmailForm={showEmailForm}
        setShowEmailForm={setShowEmailForm}
      />
      <MessageInterface
        showInterface={showInterface}
        setShowInterface={setShowInterface}
      />
      <EmailForm
        showEmailForm={showEmailForm}
        setShowEmailForm={setShowEmailForm}
      />
      <Agents />
    </div>
  ) : (
    <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  );
}

export default App;
