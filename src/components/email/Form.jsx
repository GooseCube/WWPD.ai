import Draggable from "react-draggable";
import { XCircleFill } from "react-bootstrap-icons";

const convertISOTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

/**
 *
 * @param {useRef} form, reference
 * @param {function event} sendEmail, handles onsubmit send request
 * @returns
 */
function Form({
  moments,
  showEmailForm,
  setShowEmailForm,
  setMoment,
  handleSendEmail,
  emailRef,
}) {
  return (
    <Draggable defaultPosition={{ x: 700, y: 100 }}>
      <form
        className="email-form"
        onSubmit={(e) => handleSendEmail(e, emailRef.current.value)}>
        <div className="toolbar">
          <XCircleFill
            className="email-icon"
            onClick={() => setShowEmailForm(!showEmailForm)}
          />
        </div>
        {/* Enter Email to Send Message */}
        <label>Email</label>
        <input className="email" type="email" name="to_email" ref={emailRef} />

        {/* Select a Moment from list */}
        <label>Moments</label>
        {Object.keys(moments).length > 0 ? (
          <select
            className="moments"
            name="moments"
            onChange={(e) => {
              {
                const moment = Object.values(moments)[e.target.value];
                setMoment({
                  timestamp: moment.timestamp,
                  instruction: moment.prompt.instruction,
                  context: moment.prompt.context,
                  question: moment.prompt.question,
                  response: moment.response,
                });
              }
            }}>
            {Object.values(moments).map((moment, index) => (
              <option className="moment-option" key={index} value={index}>
                {convertISOTimestamp(moment.timestamp)} {moment.response}
              </option>
            ))}
          </select>
        ) : (
          <p>Create a 'moment' in order to use the emailer</p>
        )}

        <div className="button-container">
          <input className="input-btn" type="submit" value="Send" />
          <button
            className="clear-form-btn"
            type="button"
            onClick={() => (emailRef.current.value = "")}>
            Clear
          </button>
        </div>
      </form>
    </Draggable>
  );
}

export default Form;
