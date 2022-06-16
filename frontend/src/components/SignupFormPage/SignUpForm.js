import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import './SignupForm.css';
import FormBanner from "../FormBanner";
import Prompt from "./Prompt";
import NewUser from "./NewUser";
import KeyForm from "./KeyForm";
import NewRestaurant from "./NewRestaurant";

function SignUpForm() {
    const history = useHistory();

    const prompt = "PROMPT";
    const key = "KEY"
    const newUser = "NEW_USER";
    const newRestaurant = "NEW_RESTAURANT";
    const join = "JOIN_TEAM"

    const [step, setStep] = useState(prompt);
    const [restaurant, setRestaurant] = useState(null);

    const handleCancel = () => {
        setStep(1);
        return history.push("/")
    }


    let view, props, title, subtitle;
    switch (step) {
        case prompt:
            props = {
                setStep, handleCancel,
                newUser, key
            }
            title = "Welcome to Karma Farm!"
            view = <Prompt props={props} />
            break;
        case newUser:
            props = {
                setStep, handleCancel,
                back: prompt,
                next: newRestaurant
            }
            title = "Thanks for joining us!"
            subtitle = "Let's get your account set up first"
            view = <NewUser props={props} />
            break;
        case newRestaurant:
            props = {
                handleCancel
            }
            title = "Excellent! Your personal account has been created"
            subtitle = "Now, please fill out your restaurant info"
            view = <NewRestaurant props={props} />
            break;
        case key:
            props = {
                setStep, handleCancel, setRestaurant,
                back: prompt,
                next: join,
            }
            title = "Please enter your admin key."
            subtitle = "your chef or manager must provide you with one."
            view = <KeyForm props={props} />
            break;
        case join:
            props = {
                setStep, handleCancel, restaurant,
                back: key,
            }
            title = `You are joining ${restaurant?.name}'s team`
            subtitle = "Please enter your information";
            view = <NewUser props={props} />
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
}

export default SignUpForm;