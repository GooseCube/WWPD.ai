import Draggable from "react-draggable";

function Form({ form, sendEmail }) {
  return (
    <Draggable defaultPosition={{x: 400, y: 100}}>
      <form className="email-form" ref={form} onSubmit={sendEmail}>
        <label htmlFor="name">Name</label>
        <input className="name" id="name" type="text" name="to_name" />
        <label>Email</label>
        <input className="email" type="email" name="to_email" />
        <label>Message</label>
        <textarea className="textarea" name="message" />
        <input className="input-btn" type="submit" value="Send" />
      </form>
    </Draggable>
  );
}

export default Form;
