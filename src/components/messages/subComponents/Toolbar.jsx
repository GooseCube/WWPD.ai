/* eslint-disable react/prop-types */
import {
  ChatDots,
  Keyboard,
  Lightbulb,
  XCircleFill,
} from "react-bootstrap-icons";

// On Hover Tooltip Display Message
import { Tooltip, OverlayTrigger } from "react-bootstrap";

// Load Animation
import Spinner from "react-bootstrap/Spinner";

function Toolbar({ show, dispatch, isLoading, aiModel }) {
  return (
    <div className="toolbar-container">
      {/* Toggle Between Messages & Moments */}
      {show.messages ? (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={"tooltip-top"}>View Moments</Tooltip>}>
          <Lightbulb
            className="toolbar-icon lightbulb"
            onClick={() => {
              dispatch({ type: "SET_MESSAGES", payload: !show.messages });
              dispatch({ type: "SET_INPUT_AREA", payload: false });
            }}
          />
        </OverlayTrigger>
      ) : (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={"tooltip-top"}>View Messages</Tooltip>}>
          <ChatDots
            className="toolbar-icon chat"
            onClick={() => {
              dispatch({ type: "SET_MESSAGES", payload: !show.messages });
              dispatch({ type: "SET_INPUT_AREA", payload: true });
            }}
          />
        </OverlayTrigger>
      )}

      {/* Only display keyboard (and, loading animation) for Message Input */}
      {show.messages && isLoading ? (
        <Spinner className="spinner-animation" />
      ) : (
        show.messages && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={"tooltip-top"}>Message Input</Tooltip>}>
            <Keyboard
              className="toolbar-icon keyboard"
              onClick={() =>
                dispatch({ type: "SET_INPUT_AREA", payload: !show.inputArea })
              }
            />
          </OverlayTrigger>
        )
      )}

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={"tooltip-top"}>Selected AI Model</Tooltip>}>
        <div className="ai-model-name">
          {aiModel.title} ({aiModel.type})
        </div>
      </OverlayTrigger>

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={"tooltip-top"}>Close</Tooltip>}>
        <XCircleFill
          className="toolbar-icon close"
          onClick={() =>
            dispatch({ type: "SET_INTERFACE", payload: !show.interface })
          }
        />
      </OverlayTrigger>
    </div>
  );
}

export default Toolbar;
