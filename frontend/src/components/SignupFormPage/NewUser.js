import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { csrfFetch } from "../../store/csrf";

import * as sessionActions from "../../store/session";

function NewUser({ props }) {
    const { setStep, handleCancel, restaurant, back, next } = props;

    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleNext = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            const phoneNumber = number.split("-").join("");
            // setErrors([]);

            return dispatch(sessionActions.signupUser({
                name,
                email,
                phoneNumber,
                admin: next ? true : false,
                farmer: false,
                password,
            }))
                .then(async (res) => {
                    // next if creating new account with restaurant
                    // bring to homepage if joining a team
                    if (next) {
                        setStep(next);

                    } else {
                        // create new user <-> restaurant member record
                        csrfFetch('/api/members', {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                userId: res.user.id,
                                restaurantId: restaurant.id
                            })
                        })

                        history.push("/")
                    }
                })
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }

        // if pssswords don't match
        return setErrors(['Confirm Password must be the same as Password']);
    };

    return (
        <>
            <form className="signup-form" onSubmit={handleNext}>
                {errors.map((error, idx) => (
                    <div className="signup-error" key={idx}>{error}</div>)
                )}

                <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Please enter your name"
                // required
                />

                <input
                    type="email"
                    pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Please enter your email"
                // required
                />

                <div className="phone-format">Please input in xxx-xxx-xxxx format.</div>
                <input
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    className="form-input"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Please enter your phone number"
                // required
                />

                <input
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Please enter a password"
                // required
                />

                <input
                    type="password"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Please confirm your password"
                // required
                />

                <div className="fields-required">All fields are required</div>

                <div className="signup-button-container">
                    <button
                        className="bb-wt signup-cancel-button"
                        onClick={handleCancel}
                        type="button"
                    >
                        Cancel
                    </button>
                    <div id="signup-buttons-right">
                        <button
                            className="basic-button"
                            onClick={() => setStep(back)}
                            type="button"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            id="key-next-button"
                            className="bb-wt submit-button"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </form>
            <div
                className="signup-redirect"
                onClick={() => history.push("/login")}
            >
                Already have an account?
            </div>
        </>
    )
}

export default NewUser;