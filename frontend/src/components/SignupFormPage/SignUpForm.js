import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import './SignupForm.css';
import FormBanner from "../FormBanner";
import Prompt from "./Prompt";
import NewUser from "./NewUser";
import KeyForm from "./KeyForm";
import NewRestaurant from "./NewRestaurant";

function SignUpForm() {
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    const [step, setStep] = useState(1);
    const [newOwnerId, setNewOwnerId] = useState(null);
    const [restaurant, setRestaurant] = useState(null);

    if (sessionUser) return <Redirect to="/" />;

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
                setStep, handleCancel, setNewOwnerId
            }
            title = "Thanks for joining us!"
            subtitle = "Let's get your account set up first"
            view = <NewUser props={props} />
            break;
        case 2.5:
            props = {
                setStep, handleCancel, newOwnerId,
            }
            title = "We can't wait to work with you"
            subtitle = "Plase fill out your restaurant info"
            view = <NewRestaurant props={props} />
            break;
        case 3:
            props = {
                setStep, handleCancel, setRestaurant
            }
            title = "Please enter your admin key."
            subtitle = "your chef or manager must provide you with one."
            view = <KeyForm props={props} />
            break;
        case 4:
            props = {
                setStep, handleCancel, restaurant
            }
            title = "Please enter your information"
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

        </div>
    );
}

export default SignUpForm;