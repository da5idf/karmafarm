import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import './SignupForm.css';
import FormBanner from "../FormBanner";
import Prompt from "./Prompt";
import KeyForm from "./KeyForm";
import * as sessionActions from "../../store/session";

function SignUpForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    const [step, setStep] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [restaurantNumber, setRestaurantNumber] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signupUser({ email, name, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    const handleCancel = () => {
        setStep(1);
        return history.push("/")
    }

    let view, props, title, subtitle;
    switch (step) {
        case 1:
            props = {
                setStep, handleCancel
            }
            title = "Welcome to Karma Farm!"
            view = <Prompt props={props} />
            break;
        case 2:
            props = {
                setStep
            }
            title = "Thanks for joining us!"
            break;
        case 3:
            props = {
                setStep, handleCancel
            }
            title = "Please enter your admin key."
            subtitle = "your chef or manager must provide you with one."
            view = <KeyForm props={props} />
            break;
        default:
            <Redirect to="/" />
    }

    return (
        <div id="signup-hero">
            <FormBanner />
            <div id="signup-content">
                <div id="signup-form-title-container">
                    <div id="signup-form-title">{title}</div>
                    {subtitle && <div id="signup-form-subtitle">{subtitle}</div>}
                </div>
                {view}
            </div>
        </div>
    )

    return (
        <div id="signup-hero">
            <FormBanner />
            <form id="signup-form" onSubmit={handleSubmit}>
                <div id="signup-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </div>

                <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Please enter your name"
                    required
                />

                <input
                    type="text"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your email"
                    required
                />

                <input
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please enter a password"
                    required
                />


                <input
                    type="password"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Please confirm your password"
                    required
                />

                <button
                    id="signup-button"
                    className="bb-wt"
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUpForm;