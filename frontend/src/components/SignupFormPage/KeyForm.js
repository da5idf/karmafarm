import React, { useEffect, useState } from 'react';
import { csrfFetch } from '../../store/csrf';


function KeyForm({ props }) {
    const [key, setKey] = useState("");
    const [error, setError] = useState("");

    const { setStep, handleCancel } = props

    const handleNext = async () => {
        console.log("in handleNext")
        csrfFetch('api/validatekey', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                key
            })
        })
            .then(() => {
                console.log("success!")
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data.errors) setError(data.errors)
            })
    }

    return (
        <>
            <div id="key-error">{error}</div>
            <form id="key-form">
                <input
                    type="text"
                    className="form-input"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Please enter your team's key"
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

export default KeyForm;