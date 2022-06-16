import React, { useState } from 'react';
import { csrfFetch } from '../../store/csrf';


function KeyForm({ props }) {
    const { setStep, handleCancel, setRestaurant, back, next } = props

    const [key, setKey] = useState("");
    const [error, setError] = useState("");

    const handleNext = async (e) => {
        e.preventDefault()
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
                setStep(next);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data.errors) setError(data.errors)
            })
    }

    return (
        <>
            <div className="signup-error">{error}</div>
            <form className="signup-form" onSubmit={handleNext}>
                <input
                    type="text"
                    className="form-input"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Please enter your team's key"
                    required
                />
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
                            // onClick={handleNext}
                            id="key-next-button"
                            className="bb-wt submit-button"
                            type="submit"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default KeyForm;