/* eslint-disable react/prop-types */
// React
import { useRef } from "react";

// Context Providers
import { useShow } from "../contextProviders/ShowProvider";

// Libraries
import emailjs from "@emailjs/browser";

// Sub Components
import Form from "./Form";
import { emailFormatting } from "./modules/emailFormatting";

// Styles
import "./styles/styles.css";

/**
 * Provides the input form displaying the user selected moment
 * and when an email is entered and submitted, the 'moment'
 * will be formatted for delivery
 * @param {object} moment
 * @returns the Email moment selector form
 */
function EmailForm({ moment }) {
  const { show, dispatch } = useShow();
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
      alert(`Email was successfully sent to ${email}`);
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
    show.emailForm && (
      <Form
        moment={moment}
        show={show}
        dispatch={dispatch}
        handleSendEmail={handleSendEmail}
        emailRef={emailRef}
      />
    )
  );
}

export default EmailForm;
