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
  moment,
  showEmailForm,
  setShowEmailForm,
  handleSendEmail,
  emailRef,
}) {
  return (
    <Draggable defaultPosition={{ x: 50, y: 25 }}>
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
        <label className="label-title">Email</label>
        <input
          className="email input-email"
          type="email"
          name="to_email"
          ref={emailRef}
        />

        {/* Selected Moment Header Description*/}
        <div className="label-title">Selected Moment</div>
        <div className={`selected-moment ${moment.conversation[0].primaryAgent.name} rounded p-2`}>
          {moment.conversation[0].initialResponse} . . .
        </div>

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
