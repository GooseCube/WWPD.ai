import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

// Firebase
import { onValue, ref } from "firebase/database";
import { database, auth } from "../../firebase/firebaseConfig";

// Messages Sub-Components
import Toolbar from "./subComponents/Toolbar";
import Message from "./subComponents/Message";
import TextInput from "./subComponents/TextInput";

// Interface Styles
import "./styles/styles.css";

// Message array used for testing
// import { messages } from "./static/messages";

function MessageInterface({ showInterface, setShowInterface }) {
  const [messages, setMessages] = useState([]);
  const [showInputArea, setShowInputArea] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Firebase Listener for Messages
  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const messagesRef = ref(database, `users/${userId}/messages`);
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const list = [];
        for (let id in data) {
          list.push({ id, ...data[id] });
        }
        console.log("Messages: ", list);
        setMessages(list);
      });

      return () => unsubscribe();
    }
    else {
      console.log("User is not logged in")
    }
  }, []);

  return showInterface ? (
    <div className="message-interface-container">
      <Draggable handle=".interface">
        <ResizableBox width={400} height={500} className="resizeable-box">
          <div className="interface">
            <Toolbar
              showInputArea={showInputArea}
              setShowInputArea={setShowInputArea}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              showInterface={showInterface}
              setShowInterface={setShowInterface}
            />
            <div className="message-container">
              {messages &&
                messages.length > 0 &&
                messages.map((message, index) => {
                  return <Message message={message} key={index} />;
                })}
            </div>
          </div>
          <TextInput showInputArea={showInputArea} isLoading={isLoading} />
        </ResizableBox>
      </Draggable>
    </div>
  ) : (
    ""
  );
}

export default MessageInterface;
