import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./LoginForm.css"
import FormBanner from "../FormBanner";
import PasswordToggel from "../PasswordToggle"
import * as sessionActions from "../../store/session";

function LoginForm() {
    const dispatch = useDispatch();
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

    return (
        <div id="login-hero">
            <FormBanner />
            <div id="login-form-title"></div>
            <form id="login-form" onSubmit={handleSubmit}>
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
                <button
                    type="submit"
                    id="login-button"
                    className="bb-wt"
                >
                    Log In
                </button>
            </form>
        </div>

    );
}

export default LoginForm;