import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Login CSS Styles
import "./styles.css";

function SignUp({ signUp, setSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User Signed Up, UserCredentials: ", userCredentials);
      setSignUp(false); // Switch back to login view after successful sign up
    } catch (error) {
      // Handle Errors here.
      alert("Error signing up. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="outer-form-container">
      <Form
        className="col-6 bg-dark bordered form-container"
        onSubmit={handleSignUp}>
        <Form.Text className="text-light form-text">Sign Up</Form.Text>
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
            Sign Up
          </Button>
          <Button variant="secondary" onClick={() => setSignUp(false)}>
            Back to Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
