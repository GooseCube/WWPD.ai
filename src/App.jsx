import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Agents from "./components/agents/Agents";
import MessageInterface from "./components/messages/MessageInterface";
import { useState } from "react";
import ImageScreen from "./components/visuals/ImageScreen";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showInterface, setShowInterface] = useState(false);

  return loggedIn ? (
    <div className="app-container">
      <Sidebar
        showInterface={showInterface}
        setShowInterface={setShowInterface}
      />
      <MessageInterface
        showInterface={showInterface}
        setShowInterface={setShowInterface}
      />
      <Agents />
      <ImageScreen />
    </div>
  ) : (
    <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  );
}

export default App;
