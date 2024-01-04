import {
  ChatDots,
  Keyboard,
  Lightbulb,
  Trash,
  VolumeUpFill,
  XCircleFill,
} from "react-bootstrap-icons";

// Use animation as:
// onClick={() => setIsLoading(!isLoading)}
import Spinner from "react-bootstrap/Spinner";

/**
 * @param {boolean} isLoading, while fetching api request
 * @param {boolean} showInputArea, open/close text area
 * @returns
 */
function Toolbar({
  messages,
  showInputArea,
  setShowInputArea,
  isLoading,
  setIsLoading,
  showInterface,
  setShowInterface,
}) {
  return (
    <div className="toolbar-container">
      <ChatDots className="toolbar-icon chat" />
      <Lightbulb className="toolbar-icon lightbulb" />
      <VolumeUpFill className="toolbar-icon speech" />
      <Keyboard
        className="toolbar-icon keyboard"
        onClick={() => setShowInputArea(!showInputArea)}
      />
      <XCircleFill
        className="toolbar-icon close"
        onClick={() => setShowInterface(!showInterface)}
      />
    </div>
  );
}

export default Toolbar;
