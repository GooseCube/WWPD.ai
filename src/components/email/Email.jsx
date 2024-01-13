import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Form from "./Form";
import "./styles/styles.css"

function EmailForm({ showEmailForm, setShowEmailForm }) {
  // Remember that VITE has a different import of .env variables
  // than create-react-app
  const API_KEY = import.meta.env.VITE_EMAILJS_API_KEY;
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  // This 'form' object needs to be passed down to the child node
  const form = useRef();

  const sendEmail = async (event) => {
    // Prevents the default behvior of the Form Submission
    // Any event you do not want to have run by default but allow you
    // to change or modify its behavior should include the e.preventDefault()
    event.preventDefault();
    try {
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current,
        API_KEY
      );
      console.log(result.text);
      form.current.reset(); // clear form
    } catch (error) {
      console.log("Email Request Error: ", error);
    }
  };

  return showEmailForm && <Form form={form} sendEmail={sendEmail} />;
}

export default EmailForm;
