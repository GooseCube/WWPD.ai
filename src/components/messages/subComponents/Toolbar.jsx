import {
  Lightbulb,
  Trash,
  PlayCircle,
  EnvelopeOpen,
  VolumeUpFill,
  XCircleFill,
  ChatDots,
  Keyboard,
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
  showInputArea,
  setShowInputArea,
  isLoading,
  setIsLoading,
  showInterface,
  setShowInterface,
}) {
  const clearMessages = () => {
    // remove messages
  };

  return (
    <div className="toolbar-container">
      <Trash className="toolbar-icon trash" onClick={() => clearMessages()} />
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
