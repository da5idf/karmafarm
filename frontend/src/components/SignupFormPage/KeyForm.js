import React, { useEffect, useState } from 'react';
import { csrfFetch } from '../../store/csrf';


function KeyForm({ props }) {
    const { setStep, handleCancel, setRestaurant } = props

    const [key, setKey] = useState("");
    const [error, setError] = useState("");

    const handleNext = async () => {
        setError("")
        csrfFetch('api/key/validate', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                key
            })
        })
            .then(async (res) => {
                const restaurant = await res.json();
                setRestaurant(restaurant);
                setStep(4);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data.errors) setError(data.errors)
            })
    }

    return (
        <>
            <div className="signup-error">{error}</div>
            <form className="signup-form">
                <input
                    type="text"
                    className="form-input"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Please enter your team's key"
                    required
                />
            </form>
            <div className="signup-button-container">
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
                        onClick={handleNext}
                        id="key-next-button"
                        className="bb-wt submit-button"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default KeyForm;