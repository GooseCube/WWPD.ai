/* eslint-disable react/prop-types */
import { removeMoment } from "../../../firebase/firebaseMoments";
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
function Moment({ id, moment, show, dispatch, handleEmail }) {
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
            onClick={(e) => {
              dispatch({ type: "SET_EMAIL_FORM", payload: !show.emailForm });
              handleEmail(e, moment);
            }}
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
          // display the header with original prompt (primary agent)
          return (
            <div
              key={index}
              className={`agent initial-prompt-container ${item.primaryAgent.name}`}>
              {moment.images[index] && (
                <img className="agentImage" src={moment.images[index]} />
              )}
              <div className="primaryAgent fs-3">
                {item.primaryAgent.name}: Initial Idea
              </div>
              <pre className="initialResponse fs-4">{item.initialResponse}</pre>
            </div>
          );
        }

        // display the moment conclusion, always the last item in array
        else if (index === moment.conversation.length - 1) {
          return (
            <div key={index} className="agent">
              {moment.images[index] && (
                <img className="agentImage" src={moment.images[index]} />
              )}
              <div className="speech fs-4">
                <pre className="fs-4">{item.finalSpeech}</pre>
              </div>
            </div>
          );
        }

        // display each of the agents responses that participated in the moment
        else {
          return (
            <div key={index} className={`agent ${item.agent.name} fs-3`}>
              {moment.images[index] && (
                <img className="agentImage" src={moment.images[index]} />
              )}
              <div className="agentName fs-3">{item.agent.name}:</div>
              <div className="agentResponse fs-4">{item.agentResponse}</div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Moment;
