/* eslint-disable react/prop-types */
import { removeMessage } from "../../../firebase/firebaseMessages";
import { Trash } from "react-bootstrap-icons";
import TypeWriter from "../../typeWriter/TypeWriter";

function Message({ id, message }) {
  const errorMessage = "That didn't go as planned";

  return message ? (
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

      <div className={`response ${message.agent.name}`}>
        {message.agent.name} Response:{" "}
        {message.response?.startsWith("data:image") ||
        message.response?.startsWith("blob:http") ? (
          <img
            className="response-img"
            src={message.response}
            alt="huggingface image content"
          />
        ) : (
          <pre>{message.response}</pre>
          //Typewriter component removed for now, but can be added back easily if desired.
        )}
      </div>
    </div>
  ) : (
    <div className="message-error">{errorMessage}</div>
  );
}

export default Message;
