/* eslint-disable react/prop-types */
// React
import { useState } from "react";

// Firebase
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Libraries
import emailjs from "@emailjs/browser";
import Login from "./Login";
import { welcomeEmail } from "./modules/welcomeEmail";

// React Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

// Login CSS Styles
import "./styles.css";

function SignUp({ loggedIn, setLoggedIn, signUp, setSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_USER_ID;
  const templateID = import.meta.env.VITE_EMAILJS_VERIFICATION_TEMPLATE;

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setShowError(true);
      setEmail(""); // Clears the input field
      return;
    }

    try {
      console.log("Email sent to: ", email);
      const templateParams = welcomeEmail(email);
      const emailVerification = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );
      if (!emailVerification) {
        throw new Error(emailVerification);
      }
    } catch (error) {
      setErrorMessage(
        "We were unable to verify the email given, please enter a valid email."
      );
      setShowError(true);
      setEmail(""); // Clears the input field
      console.error(`Email validation error: ${error}`);
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User Signed Up, UserCredentials: ", userCredentials);
      setSignUp(false); // Switch back to login view after successful sign up
    } catch (error) {
      setErrorMessage("Error signing up. Please try again.");
      setShowError(true);
      console.error(error);
    }
  };

  return !signUp ? (
    <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  ) : (
    <>
      <Modal show={showError} onHide={() => setShowError(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowError(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="outer-form-container">
        <Form
          className="col-6 bordered form-container sign-up"
          onSubmit={handleSignUp}>
          <Form.Text className="text-light form-text">Join Us</Form.Text>
          <Form.Group className="mb-3 form-group" controlId="formBasicEmail">
            <Form.Label className="form-email">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="form-password">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-center gap-3 form-selection-container">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={() => setSignUp(false)}>
              Back to Login
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default SignUp;
