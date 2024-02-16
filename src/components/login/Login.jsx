/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import Toast from "react-bootstrap/Toast";

// Firebase
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

// Local Component
import SignUp from "./SignUp";

// CSS Styles
import "./styles.css";

function Login({ loggedIn, setLoggedIn }) {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setShowError(true);
      return;
    }

    // Password validation
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      setShowError(true);
      return;
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoggedIn(!loggedIn);
    } catch (error) {
      setErrorMessage(
        "The email or password entered does not exist. Try SignUp to login."
      );
      setShowError(true);
      console.error(error);
    }
  };

  return signUp ? (
    <SignUp
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
      signUp={signUp}
      setSignUp={setSignUp}
    />
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
          className="col-6 bg-dark bordered form-container"
          onSubmit={handleLogin}>
          <Form.Text className="text-light form-text">Login</Form.Text>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="form-email">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="form-password">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
            />
          </Form.Group>

          <div className="d-flex justify-content-center gap-3 form-selection-container">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={() => setSignUp(true)}>
              SignUp
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login;
