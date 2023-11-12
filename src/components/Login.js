import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { googleSignIn, user } = UserAuth();

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        setIsAuthenticated(true);

        if (user != null) {
          navigate("/");
        }
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        alert("Google Sign-In popup closed. Please try again.");
        navigate("/login"); 
      } else if (error.code === "auth/cancelled-popup-request") {
        alert("Google Sign-In request cancelled. Please try again.");
      } else {
        console.error(error);
        alert("Google Sign-In failed. Please try again.");
      }
    }
  };
  

  return (
    <div className="auth-form-container">
      <div className='max-w-[240px] m-auto py-4'>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>

      <h2>Login</h2>
      <div className="login-form">
        <label htmlFor="email">Email</label>
        <input
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <div className="form-check">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
        </div>
        <b className="error">{errorMsg}</b>
        <button disabled={submitButtonDisabled} onClick={handleSubmission}>
          Login
        </button>
      </div>
      <p>
        <span>
          <Link to="/forgotPassword" className="link-btn">Forgot Password?{" "}</Link>
        </span>
      </p>
      <p>
        Don't have an account?{" "}
        <span>
          <Link to="/signup" className="link-btn">Register here.</Link>
        </span>
      </p>
    </div>
  );
}

export default Login;