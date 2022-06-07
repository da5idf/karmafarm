import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import './LoginForm.css'
import FormBanner from "../FormBanner";

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        );
    };

    return (
        <div id="login-hero">
            <FormBanner />
            <div id="form-title">Welcome Back!</div>
            <form id="login-form" onSubmit={handleSubmit}>
                <div id="login-errors">
                    {errors.map((error, idx) => (
                        <div key={idx}>{error}</div>
                    ))}
                </div>
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    placeholder="Enter your email"
                    required
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />

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