import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Form from "./Form";
import "./styles/styles.css";
import { emailFormatting } from "./modules/emailFormatting";

/**
 * Uses the AuthContext 'moments' allowing a user to select
 * a moment from the list, and the email to send the 'moment' to
 * @param {useState param} showEmailform
 * @param {useState setter} setShowEmailForm
 * @returns the Email moment selector form
 */
function EmailForm({ showEmailForm, setShowEmailForm, moment }) {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_USER_ID;
  const emailRef = useRef();

  const handleSendEmail = async (event, email) => {
    event.preventDefault();
    console.log(
      "Formatted Email: ",
      emailFormatting(moment.conversation, email)
    );

    const templateParams = emailFormatting(moment.conversation, email);

    try {
      const result = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );
      console.log("EmailJS Request Success: ", result.text);
    } catch (error) {
      console.log("EmailJS Request Error: ", error);
    }
    emailRef.current.value = "";
  };

  if (!moment) {
    return (
      <div className="moment-error fs-5">
        No moments are currently available to email.
      </div>
    );
  }

  return (
    showEmailForm && (
      <Form
        moment={moment}
        showEmailForm={showEmailForm}
        setShowEmailForm={setShowEmailForm}
        handleSendEmail={handleSendEmail}
        emailRef={emailRef}
      />
    )
  );
}

export default EmailForm;
