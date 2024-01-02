import React, { useState, useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

// Messages Sub-Components
import Toolbar from "./subComponents/Toolbar";
import Message from "./subComponents/Message";
import TextInput from "./subComponents/TextInput";

// Interface Styles
import "./styles/styles.css";

function MessageInterface({ showInterface, setShowInterface }) {
  const { messages } = useContext(AuthContext);
  const [showInputArea, setShowInputArea] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
