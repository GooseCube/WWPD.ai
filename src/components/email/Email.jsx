import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Form from "./Form";
import "./styles/styles.css";

function EmailForm({ showEmailForm, setShowEmailForm }) {
  const API_KEY = import.meta.env.VITE_EMAILJS_API_KEY;
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  // This 'form' object needs to be passed down to the child node
  const form = useRef();
  const [emailData, setEmailData] = useState(null);

  const sendEmail = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    const emailDataString = formData.get("emailData");
    if (emailDataString) {
      const data = JSON.parse(emailDataString);
      console.log("Form Current: ", data);
    } else {
      console.log("No moment selected");
    }

    // try {
    //   const result = await emailjs.sendForm(
    //     SERVICE_ID,
    //     TEMPLATE_ID,
    //     form.current,
    //     API_KEY
    //   );
    //   console.log(result.text);
    //   form.current.reset(); // clear form
    // } catch (error) {
    //   console.log("Email Request Error: ", error);
    // }
  };

  return (
    showEmailForm && (
      <Form form={form} sendEmail={sendEmail} setEmailData={setEmailData} />
    )
  );
}

export default EmailForm;
