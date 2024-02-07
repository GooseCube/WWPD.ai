import React, { useState, useContext } from "react";
import { AuthContext } from "../contextProviders/AuthProvider";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

// Messages Sub-Components
import Toolbar from "./subComponents/Toolbar";
import Message from "./subComponents/Message";
import Moment from "./subComponents/Moment";
import TextInput from "./subComponents/TextInput";

// Import Other Components
import EmailForm from "../email/Email"

// Interface Styles
import "./styles/styles.css";

function MessageInterface({
  showInterface,
  setShowInterface,
  showEmailForm,
  setShowEmailForm,
  handleEmail
}) {
  const { agents, messages, moments, sidebar } = useContext(AuthContext);
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
              aiModel={sidebar.aiModel}
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
                  return (
                    <Moment
                      id={id}
                      moment={moment}
                      key={id}
                      showEmailForm={showEmailForm}
                      setShowEmailForm={setShowEmailForm}
                      handleEmail={handleEmail}
                    />
                  );
                })}
              </div>
            )}
            {/* If the location of TextInput inside the 'interface' div container causes issues, move outside of the div container */}
            <TextInput
              showInputArea={showInputArea}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              sidebar={sidebar}
              agents={agents}
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
