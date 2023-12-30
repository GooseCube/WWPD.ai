import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Firebase
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

// Local Component
import SignUp from "./SignUp";

// Background Images top Level Assets
import PerspectiveImageSteven from "../../assets/login/StevenAbstract.jpg";
import PerspectiveImageGooseCubeLogo from "../../assets/login/goosecubelogo.png";

// CSS Styles
import "./styles.css";

/**
 * Uses Firebase to loggin user
 * @param {boolean} loggedIn
 * @param {useState Function} setLoggedIn
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
      console.log("LogIn Successful (credentials): ", userCredentials)
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
      <img
        src={PerspectiveImageSteven}
        alt="Perspective Image"
        className="perspective-image-steven"
      />
      <img
        src={PerspectiveImageGooseCubeLogo}
        alt="Perspective Image"
        className="perspective-image-goose-cube-logo"
      />
      <Form
        className="col-6 mt-4 bg-dark bordered form-container"
        onSubmit={handleLogin}>
        <Form.Text className="fs-1 text-light">Login</Form.Text>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
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
