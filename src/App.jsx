import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Players from "./components/player/Players";
import MessageInterface from "./components/messages/MessageInterface";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showInterface, setShowInterface] = useState(false);

  // return (
  //   <div className="app-container">
  //     <Sidebar
  //       showInterface={showInterface}
  //       setShowInterface={setShowInterface}
  //     />
  //     <MessageInterface
  //       showInterface={showInterface}
  //       setShowInterface={setShowInterface}
  //     />
  //     <Players />
  //   </div>
  // );

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
      <Players />
    </div>
  ) : (
    <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  );
}

export default App;
