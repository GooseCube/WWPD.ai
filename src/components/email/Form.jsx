import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import Draggable from "react-draggable";

const convertISOTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};



/**
 *
 * @param {useRef} form, reference
 * @param {function event} sendEmail, handles onsubmit send request
 * @returns
 */
function Form({ form, sendEmail, emailData, setEmailData }) {
  const { moments, messages } = useContext(AuthContext);

  return (
    <Draggable defaultPosition={{ x: 700, y: 100 }}>
      <form className="email-form" ref={form} onSubmit={handleSubmit}>
        <label>Email</label>
        <input className="email" type="email" name="to_email" />

        <label>Moments</label>
        <input
          type="hidden"
          name="emailData"
          value={JSON.stringify(emailData)}
        />

        <select
          className="moments"
          name="moments"
          onChange={(e) => {
            const selectedMoment = Object.values(moments)[e.target.value];
            setEmailData(selectedMoment);
          }}
          
          >
          {Object.values(moments).map((moment, index) => (
            <option className="moment-option" key={index} value={index}>
              {convertISOTimestamp(moment.timestamp)} {moment.response}
            </option>
          ))}
        </select>

        <input className="input-btn" type="submit" value="Send" />
      </form>
    </Draggable>
  );
}

export default Form;
