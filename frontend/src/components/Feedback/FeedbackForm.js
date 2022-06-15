import React, { useState } from "react";

import "./FeedbackForm.css"

function FeedbackForm() {

    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const submitFeedback = (e) => {
        e.preventDefault();
        if (text.length <= 10) {
            setError("Minimum 10 characters")
            return;
        }
        console.log(text);

    }

    return (
        <form id="feedback-form-hero" onSubmit={submitFeedback}>
            <div
                id="feedback-form-title"
                className="page-subtitle"
            >
                Submit feedback on an order</div>
            <div id="feedback-selectors">
                <div>Orders</div>
                <div>Items</div>
            </div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                minLength="10"
                id="feedback-text"
            />
            <div id="feedback-error-submit-container">
                {error && <div id="feedback-error">{error}</div>}
                <button
                    id="feedback-submit-button"
                    className="green-button"
                    type="submit"
                >
                    Submit feedback
                </button>
            </div>
            <div id="feedback-submit-confirm">
                Thanks for your feedback!
            </div>
        </form>
    )
}

export default FeedbackForm;