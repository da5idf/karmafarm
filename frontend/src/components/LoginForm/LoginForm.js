import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./LoginForm.css"
import FormBanner from "../FormBanner";
import PasswordToggel from "../PasswordToggle"
import * as sessionActions from "../../store/session";

function LoginForm() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const history = useHistory();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [isPassword, setIsPassword] = useState("password");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await dispatch(sessionActions.login({ credential, password }))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                }
            );
    };

    const farmerLogin = async () => {
        await dispatch(sessionActions.login({
            credential: "jon@user.io",
            password: "password"
        }))
    }

    const restaurantLogin = async () => {
        await dispatch(sessionActions.login({
            credential: "jeremy@user.io",
            password: "password2"
        }))
    }

    if (user?.id) {
        return history.push("/")
    }

    return (
        <div id="login-hero">
            <FormBanner />
            <div id="login-content">

                <div id="login-form-title">Welcome Back!</div>
                <form id="login-form" onSubmit={handleSubmit} >
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
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            id="login-button"
                            className="bb-wt submit-button"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <div
                    className="signup-redirect"
                    onClick={() => history.push("/signup")}
                >
                    Need to sign up?
                </div>
                <div className="signup-button-container" >
                    <button
                        id="demo-farmer-login"
                        className="green-button"
                        onClick={farmerLogin}
                        type="button"
                    >
                        Demo Farmer
                    </button>
                    <button
                        id="demo-restaurant-login"
                        onClick={restaurantLogin}
                        type="button"
                    >
                        Demo Restaurant
                    </button>
                </div>
            </div>
        </div>

    );
}

export default LoginForm;