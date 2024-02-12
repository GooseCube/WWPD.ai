/* eslint-disable react/prop-types */
import { removeMessage } from "../../../firebase/firebaseMessages";
import { Trash } from "react-bootstrap-icons";

function Message({ id, message }) {
  // Check if the response is a URL
  const isUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      // the (_) indicates that error is not used in catch (ignored)
      return false;
    }
  };

  return (
    <div key={id} className="message">
      <div className={`prompt ${message.agent.name}`}>
        <Trash
          className="delete-message-icon"
          onClick={() => removeMessage(id)}
        />{" "}
        {new Date(message.timestamp).toLocaleDateString("en-US")} <br />
        <pre className="prompt">
          {message.agent.name} Prompt: {message.prompt}
        </pre>
      </div>
      {/* Dynamic class name using agent NAME allows custom background color styling for each agent message */}
      <div className={`response ${message.agent.name}`}>
        {message.agent.name} Response:{" "}
        {new Date(message.timestamp).toLocaleDateString("en-US")} <br />
        {isUrl(message.response) ? (
          <img
            className="response-img"
            src={message.response}
            alt="huggingface image content"
          />
        ) : (
          <pre>{message.response}</pre>
        )}
      </div>
    </div>
  );
}

export default Message;
