import { removeMoment } from "../../../firebase/firebaseDB";
import { saveAs } from "file-saver";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Envelope, Trash, Download } from "react-bootstrap-icons";

/**
 * Save the moment as a .txt file with .json encoding
 * This should be easily converted to .json if you want this file type,
 * otherwise for most users it is better to have a .txt file
 * @param {object} moment
 */
const downloadMoment = (moment) => {
  const blob = new Blob([JSON.stringify(moment, null, 2)], {
    type: "application/json",
  });
  saveAs(
    blob,
    `moment-${new Date(moment.timestamp).toLocaleDateString("en-US")}.txt`,
    { autoBom: true }
  );
};

/**
 * @param {array[{objects}]} moment Firebase Realtime Database
 * @param {number} id moments id from Firebase, necessary for virtual DOM to track each new node mapped()
 * and to remove a moment from the Firebase DB.
 * @returns a single 'moment' from idea -> discussion -> final speech
 */
function Moment({ id, moment }) {
  return (
    <div className="moment-container">
      <div className="moment-toolbar fs-5">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={"tooltip-top"}>Download Moment</Tooltip>}>
          <Download
            className="download-moment-icon"
            onClick={() => downloadMoment(moment)}
          />
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={"tooltip-top"}>Email Moment</Tooltip>}>
          <Envelope
            className="email-moment-icon"
            onClick={() => downloadMoment(moment)}
          />
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={"tooltip-top"}>Delete Moment</Tooltip>}>
          <Trash
            className="delete-message-icon"
            onClick={() => removeMoment(id)}
          />
        </OverlayTrigger>
        <div className="date-timestamp">
          {new Date(moment.timestamp).toLocaleDateString("en-US")}
        </div>
      </div>
      {moment.conversation.map((item, index) => {
        if (index === 0) {
          return (
            <div
              key={index}
              className={`agent initial-prompt-container ${item.primaryAgent.name}`}>
              <div className="primaryAgent fs-5">
                {item.primaryAgent.name} Initial Prompt:
              </div>
              <div className="agent initialPrompt fs-5">
                {item.initialPrompt.question}
              </div>
              <div className="agent initialResponse fs-5">
                <pre>{item.initialResponse}</pre>
              </div>
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
