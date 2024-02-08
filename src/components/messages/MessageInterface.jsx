/* eslint-disable react/prop-types */

// React
import { useState, useContext } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";

// Global Context Providers
import { AuthContext } from "../contextProviders/AuthProvider";
import { useShow } from "../contextProviders/ShowProvider";

// Messages Sub-Components
import Toolbar from "./subComponents/Toolbar";
import Message from "./subComponents/Message";
import Moment from "./subComponents/Moment";
import TextInput from "./subComponents/TextInput";

// Interface Styles
import "react-resizable/css/styles.css";
import "./styles/styles.css";

function MessageInterface({ handleEmail }) {
  const { agents, messages, moments, sidebar } = useContext(AuthContext);
  const { show, dispatch } = useShow();

  const [showMessages, setShowMessages] = useState(true);
  const [showInputArea, setShowInputArea] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    show.interface && sidebar.aiModel && (
      <div className="message-interface-container">
        <Draggable handle=".interface">
          <ResizableBox width={400} height={500} className="resizable-box">
            <div className="interface">
              <Toolbar
                show={show}
                dispatch={dispatch}
                showMessages={showMessages}
                setShowMessages={setShowMessages}
                showInputArea={showInputArea}
                setShowInputArea={setShowInputArea}
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
                        show={show}
                        dispatch={dispatch}
                        handleEmail={handleEmail}
                      />
                    );
                  })}
                </div>
              )}
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
    )
  );
}

export default MessageInterface;
