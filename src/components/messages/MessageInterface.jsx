import React, { useState, useContext, useEffect } from "react";
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
              messages={messages}
              showInputArea={showInputArea}
              setShowInputArea={setShowInputArea}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              showInterface={showInterface}
              setShowInterface={setShowInterface}
            />
            {messages && (
              <div className="message-container">
                {Object.entries(messages).map(([id, message]) => {
                  return <Message id={id} message={message} key={id} />;
                })}
              </div>
            )}
            {/* If the location of TextInput inside the 'interface' div container causes issues, move outside of the div container */}
            <TextInput showInputArea={showInputArea} isLoading={isLoading} />
          </div>
        </ResizableBox>
      </Draggable>
    </div>
  ) : (
    ""
  );
}

export default MessageInterface;
