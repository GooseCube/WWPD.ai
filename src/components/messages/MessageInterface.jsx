import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

// Messages Sub-Components
import Toolbar from "./subComponents/Toolbar";
import Message from "./subComponents/Message";
import Moment from "./subComponents/Moment";
import TextInput from "./subComponents/TextInput";

// Interface Styles
import "./styles/styles.css";

function MessageInterface({ showInterface, setShowInterface }) {
  const { messages, moments } = useContext(AuthContext);
  const [showMessages, setShowMessages] = useState(true);
  const [showInputArea, setShowInputArea] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return showInterface ? (
    <div className="message-interface-container">
      <Draggable handle=".interface">
        <ResizableBox width={400} height={500} className="resizeable-box">
          <div className="interface">
            <Toolbar
              showMessages={showMessages}
              setShowMessages={setShowMessages}
              showInputArea={showInputArea}
              setShowInputArea={setShowInputArea}
              showInterface={showInterface}
              setShowInterface={setShowInterface}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            {messages && showMessages && (
              <div className="message-container">
                {Object.entries(messages).map(([id, message]) => {
                  return <Message id={id} message={message} key={id} />;
                })}
              </div>
            )}
            {moments && !showMessages && (
              <div className="message-container">
                {Object.entries(moments).map(([id, moment]) => {
                  return <Moment id={id} moment={moment} key={id} />;
                })}
              </div>
            )}
            {/* If the location of TextInput inside the 'interface' div container causes issues, move outside of the div container */}
            <TextInput
              showInputArea={showInputArea}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </ResizableBox>
      </Draggable>
    </div>
  ) : (
    ""
  );
}

export default MessageInterface;
