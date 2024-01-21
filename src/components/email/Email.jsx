import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../firebase/AuthProvider";
import emailjs from "@emailjs/browser";
import Form from "./Form";
import "./styles/styles.css";

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
    console.log("Email: ", email)
    console.log("Inside handleSendEmail ", moment)
    // const agent = agents.find((a) => a.playerControlled === true);
    // const templateParams = {
    //   ...moment,
    //   agent_name: agent.name,
    //   to_email: email,
    // };

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
