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

/**
 * @param {boolean} isLoading, while fetching api request
 * @param {boolean} showInputArea, open/close text area
 * @returns
 */
function Toolbar({
  show,
  dispatch,
  showMessages,
  setShowMessages,
  showInputArea,
  setShowInputArea,
  isLoading,
  aiModel,
}) {
  return (
    <div className="toolbar-container">
      {/* Toggle Between Messages & Moments */}
      {showMessages ? (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={"tooltip-top"}>View Moments</Tooltip>}>
          <Lightbulb
            className="toolbar-icon lightbulb"
            onClick={() => {
              setShowMessages(!showMessages);
              setShowInputArea(false);
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
              setShowMessages(!showMessages);
              setShowInputArea(true);
            }}
          />
        </OverlayTrigger>
      )}

      {/* Only display keyboard (and, loading animation) for Message Input */}
      {showMessages && isLoading ? (
        <Spinner className="spinner-animation" />
      ) : (
        showMessages && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={"tooltip-top"}>Message Input</Tooltip>}>
            <Keyboard
              className="toolbar-icon keyboard"
              onClick={() => setShowInputArea(!showInputArea)}
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
          onClick={() => dispatch({ type: 'SET_INTERFACE', payload: !show.interface})}
        />
      </OverlayTrigger>
    </div>
  );
}

export default Toolbar;
