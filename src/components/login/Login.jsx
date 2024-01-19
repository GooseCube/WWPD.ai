import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Firebase
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

// Local Component
import SignUp from "./SignUp";

// CSS Styles
import "./styles.css";

/**
 * Uses Firebase to loggin user
 * @param {useState: boolean} loggedIn
 * @param {useState: function} setLoggedIn
 */
function Login({ loggedIn, setLoggedIn }) {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("LogIn Successful (credentials): ", userCredentials);
      setLoggedIn(!loggedIn);
    } catch (error) {
      alert(
        "The email or password entered does not exist. Try SignUp to login."
      );
      console.error(error);
    }
  };

  return signUp ? (
    <SignUp signUp={signUp} setSignUp={setSignUp} />
  ) : (
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
          <Button variant="secondary" onClick={() => setSignUp(true)}>
            SignUp
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
