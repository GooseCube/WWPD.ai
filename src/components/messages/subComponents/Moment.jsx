import { removeMoment } from "../../../firebase/firebaseDB";
import { Trash } from "react-bootstrap-icons";

/**
 * @param {object} moment Firebase Object:
 *  path: users/id
 *    /moments/id
 *      /prompt/ {context, instruction, question, title}
 *      /response
 *      timestamp
 * @param {number} id moments id from Firebase, necessary for virtual DOM to track each new node mapped()
 * and to remove a moment from the Firebase DB.
 * @returns a message with prompt and response
 */
function Moment({ id, moment }) {
  return (
    <div key={id} className="moment">
      <div className="prompt">
        <Trash
          className="delete-message-icon"
          onClick={() => removeMoment(id)}
        />{" "}
        Prompt: {new Date(moment.timestamp).toLocaleDateString("en-US")}
        <pre>Context: {moment.prompt.context}</pre>
        <pre>Instruction: {moment.prompt.instruction}</pre>
        <pre>Question: {moment.prompt.question}</pre>
      </div>

      <div className="response">
        Response: {new Date(moment.timestamp).toLocaleDateString("en-US")}{" "}
        <pre>{moment.response}</pre>
      </div>
    </div>
  );
}

export default Moment;
