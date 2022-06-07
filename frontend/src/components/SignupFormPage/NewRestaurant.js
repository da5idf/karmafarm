import React, { useState } from "react";
import { csrfFetch } from "../../store/csrf";

function NewRestaurant({ props }) {
    const { setStep, handleCancel } = props;

    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");

    const handleNext = async () => {
        const restaurantNumber = number.split("-").join("");

        setError("");
        csrfFetch('api/restaurants/new', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                address,
                restaurantNumber
            })
        })
            .then(async (res) => {

            })
            .catch(async (res) => {
                const data = await res.json();
                setError(data.errors)
            })
    }

    return (
        <>
            <div className="signup-error">{error}</div>
            <form className="signup-form">
                <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Please enter your restaurant's name"
                    required
                />
                <input
                    type="text"
                    className="form-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Please enter your restaurant's address"
                    required
                />
                <div className="phone-format">Please input in xxx-xxx-xxxx format.</div>
                <input
                    type="text"
                    className="form-input"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Please enter your restaurant's phone number"
                    required
                />
            </form>
            <div id='signup-button-container'>
                <button
                    className="bb-wt signup-cancel-button"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
                <div id="signup-buttons-right">
                    <button
                        className="basic-button"
                        onClick={() => setStep(1)}
                    >
                        Back
                    </button>
                    <button
                        id="key-next-button"
                        className="bb-wt"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default NewRestaurant;