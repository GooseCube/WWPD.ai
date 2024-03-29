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
import SpinnerAnimation from "../../loadAnimations/Spinner";

function Toolbar({ show, dispatch, aiModel }) {
  const animationAttributes = {
    className: "toolbar-animation",
    animation: "grow", // you can also use "border" for circle
  };

  return (
    <div className="toolbar-container">
      {/* Toggle Between Messages & Moments */}
      {show.messages ? (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={"tooltip-top"}>View Moments</Tooltip>}
        >
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
          overlay={<Tooltip id={"tooltip-top"}>View Messages</Tooltip>}
        >
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
      {show.messages && show.isLoading ? (
        <SpinnerAnimation attributes={animationAttributes} />
      ) : (
        show.messages
      )}

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={"tooltip-top"}>Selected AI Model</Tooltip>}
      >
        <div className="ai-model-name">
          {aiModel.title} ({aiModel.type})
        </div>
      </OverlayTrigger>
    </div>
  );
}

export default Toolbar;
