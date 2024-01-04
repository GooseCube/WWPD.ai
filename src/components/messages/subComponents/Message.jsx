import { removeMessage } from "../../../firebase/firebaseDB";
import { Trash } from "react-bootstrap-icons";

/**
 * @param {object} message {id: string, prompt: string, response: string}
 * @param {number} id message id from Firebase, necessary for virtual DOM to track each new node mapped()
 * and to remove messages from the Firebase DB.
 * @returns a message with prompt and response
 */
function Message({ id, message }) {
  return (
    <div key={id} className="message">
      <div className="prompt">
        <Trash
          className="delete-message-icon"
          onClick={() => removeMessage(id)}
        />{" "}Prompt: {new Date(message.timestamp).toLocaleDateString("en-US")} <br />
        {message.prompt}
      </div>
      <div className="response">
        Response: {new Date(message.timestamp).toLocaleDateString("en-US")}{" "}
        <br />
        {message.response}
      </div>
    </div>
  );
}

export default Message;
