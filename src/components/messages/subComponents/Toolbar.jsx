import {
  ChatDots,
  Keyboard,
  Lightbulb,
  VolumeUpFill,
  XCircleFill,
} from "react-bootstrap-icons";

import { Tooltip, OverlayTrigger } from "react-bootstrap";

// Use animation as:
// onClick={() => setIsLoading(!isLoading)}
import Spinner from "react-bootstrap/Spinner";

/**
 * @param {boolean} isLoading, while fetching api request
 * @param {boolean} showInputArea, open/close text area
 * @returns
 */
function Toolbar({
  showMessages,
  setShowMessages,
  showInputArea,
  setShowInputArea,
  showInterface,
  setShowInterface,
  isLoading,
  aiModel
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
        overlay={<Tooltip id={"tooltip-top"}>Text2Speech Coming Soon</Tooltip>}>
        <VolumeUpFill className="toolbar-icon speech" />
      </OverlayTrigger>
      <div className="ai-model-name">{aiModel}</div>

      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={"tooltip-top"}>Close</Tooltip>}>
        <XCircleFill
          className="toolbar-icon close"
          onClick={() => setShowInterface(!showInterface)}
        />
      </OverlayTrigger>
    </div>
  );
}

export default Toolbar;
