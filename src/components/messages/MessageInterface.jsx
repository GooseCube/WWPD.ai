/* eslint-disable react/prop-types */

// React
import { useContext } from "react";
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

  return (
    show.interface &&
    sidebar.aiModel && (
      <div className="message-interface-container">
        <Draggable handle=".toolbar-handle">
          <ResizableBox width={800} height={600} className="resizable-box">
            <div className="interface">
              <div className="toolbar-handle">
                <Toolbar
                  show={show}
                  dispatch={dispatch}
                  aiModel={sidebar.aiModel}
                />
              </div>
              {messages && show.messages && (
                <div className="message-container">
                  {Object.entries(messages).map(([id, message]) => {
                    return <Message id={id} message={message} key={id} />;
                  })}
                </div>
              )}
              {moments && !show.messages && (
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
                show={show}
                dispatch={dispatch}
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
