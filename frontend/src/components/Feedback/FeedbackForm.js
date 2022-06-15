import React, { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { createFeedback } from "../../store/feedback";

import "./FeedbackForm.css"

function FeedbackForm({ user }) {
    const dispatch = useDispatch();

    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const submitFeedback = (e) => {
        e.preventDefault();
        if (text.length <= 10) {
            setError("Minimum 10 characters")
            return;
        }
        const feedback = {
            text,
            userId: user.id,
            restaurantId: 1, // need to fix this ************
            orderId: 1, // need to fix this ************
            productId: 1, // need to fix this ************
        }
        dispatch(createFeedback(feedback))
        toggleConfirm();
    }

    const toggleConfirm = () => {
        const modal = document.getElementById("feedback-confirmation-modal")
        modal.style.display = "flex";
        setTimeout(() => {
            modal.style.display = "none";
        }, 1500)
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
            <div id="feedback-confirmation-modal" className="appear-from-right">
                <div>Thanks for your feedback!</div>
            </div>
        </form>
    )
}

export default FeedbackForm;