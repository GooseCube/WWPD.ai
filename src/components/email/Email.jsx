import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
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
  const { agents } = useContext(AuthContext);
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_USER_ID;
  // const [moment, setMoment] = useState({});
  const emailRef = useRef();

  const handleSendEmail = async (event, email) => {
    event.preventDefault();
    console.log("Moment: ", moment)
    console.log("Formatted Email: ", emailFormatting(moment.conversation, email));
    // const agent = agents.find((a) => a.playerControlled === true);
    // const templateParams = emailFormatting(moment.conversation, email);

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
    // emailRef.current.value = "";
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
