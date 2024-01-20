import { removeMoment } from "../../../firebase/firebaseDB";
import { Trash } from "react-bootstrap-icons";

/**
 * @param {array[{objects}]} moment Firebase Realtime Database
 * @param {number} id moments id from Firebase, necessary for virtual DOM to track each new node mapped()
 * and to remove a moment from the Firebase DB.
 * @returns a single 'moment' from idea -> discussion -> final speech
 */
function Moment({ id, moment }) {
  return (
    <div className="moment-container">
      <div className="date-container fs-5">
        <Trash
          className="delete-message-icon"
          onClick={() => removeMoment(id)}
        />{" "}
        {new Date(moment.timestamp).toLocaleDateString("en-US")}
      </div>
      {moment.conversation.map((item, index) => {
        if (index === 0) {
          return (
            <div key={index} className={`agent initial-prompt-container ${item.primaryAgent.name}`}>
              <div className="primaryAgent fs-5">{item.primaryAgent.name} Initial Prompt:</div>
              <div className="initialPrompt fs-5">
                {item.initialPrompt.question}
              </div>
              <div className="initialResponse fs-5">{item.initialResponse}</div>
            </div>
          );
        } else if (index === moment.conversation.length - 1) {
          return (
            <div key={index} className="agent">
              <div className="header fs-5">
                <pre>{item.header}</pre>
              </div>
              <div className="speech fs-5">
                <pre>{item.speech}</pre>
              </div>
              <div className="agent">----------------- End of Moment -----------------</div>
            </div>
          );
        } else {
          return (
            <div key={index} className={`agent ${item.agent.name} fs-5`}>
              <div className="agentName fs-5">{item.agent.name}:</div>
              <div className="agentResponse fs-5">{item.agentResponse}</div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Moment;
