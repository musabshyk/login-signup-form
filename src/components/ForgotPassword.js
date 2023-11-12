import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emalVal = e.target.email.value;
        sendPasswordResetEmail(auth, emalVal).then(data => {
            alert("Check your gmail")
            history("/")
        }).catch(err => {
            alert(err.code)
        })
    }
    return (
        <div className="auth-form-container">
            <h2>Forgot Password</h2>
            <form className="forgot-password-form" onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                />
                <button type="submit" className="btn-primary">Reset Password</button>
            </form>
            <p>
                <span>
                    <Link to="/login" className="link-btn">Back to Login</Link>
                </span>
            </p>
        </div>
    )
}
export default ForgotPassword;