import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Form from "./Form";
import "./styles/styles.css";

function EmailForm({ showEmailForm, setShowEmailForm }) {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_API_KEY;
  const [moment, setMoment] = useState({});
  const emailRef = useRef();

  const handleSendEmail = async (event, email) => {
    event.preventDefault();
    const templateParams = {
      ...moment,
      email: email,
    }

    console.log("email: ", email)
    console.log(templateParams);

    // try {
    //   const result = await emailjs.send(
    //     serviceID,
    //     templateID,
    //     templateParams,
    //     publicKey
    //   );
    //   console.log(result.text);
    // } catch (error) {
    //   console.log("Email Request Error: ", error);
    // }
    emailRef.current.value = '';
  };

  return (
    showEmailForm && (
      <Form
        showEmailForm={showEmailForm}
        setShowEmailForm={setShowEmailForm}
        setMoment={setMoment}
        handleSendEmail={handleSendEmail}
        emailRef={emailRef}
      />
    )
  );
}

export default EmailForm;
