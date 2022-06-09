import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./LoginForm.css"
import FormBanner from "../FormBanner";
import PasswordToggel from "../PasswordToggle"
import * as sessionActions from "../../store/session";
import Homepage from "../Homepage";

function LoginForm() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const history = useHistory();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [isPassword, setIsPassword] = useState("password");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(sessionActions.login({ credential, password }))
            .then(() => {
                history.push("/")
            })
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                }
            );
    };

    if (user?.id) {
        return <Homepage />
    }

    return (
        <div id="login-hero">
            <FormBanner />
            <div id="login-content">

                <div id="login-form-title">Welcome Back!</div>
                <div id="login-form" >
                    <div id="login-errors">
                        {errors.map((error, idx) => (
                            <div key={idx}>{error}</div>
                        ))}
                    </div>
                    <div className="form-field">
                        <input
                            type="text"
                            className="form-input"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-field">

                        <input
                            type={isPassword}
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                        <PasswordToggel isPassword={isPassword} setIsPassword={setIsPassword} />
                    </div>
                    <div className="signup-button-container" >
                        <button
                            id="login-cancel-button"
                            className="bb-wt"
                            onClick={() => history.push("/")}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            id="login-button"
                            className="bb-wt submit-button"
                        >
                            Log In
                        </button>
                    </div>
                </div>
                <div
                    className="signup-redirect"
                    onClick={() => history.push("/signup")}
                >
                    Need to sign up?
                </div>
            </div>
        </div>

    );
}

export default LoginForm;