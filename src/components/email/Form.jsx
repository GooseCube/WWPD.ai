function Form({ form, sendEmail }) {
  return (
    <form ref={form} onSubmit={sendEmail}>
      <label htmlFor="name">Name</label>
      <input className="name" id="name" type="text" name="to_name" />
      <label>Email</label>
      <input className="email" type="email" name="to_email" />
      <label>Message</label>
      <textarea className="textarea" name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}

export default Form;
