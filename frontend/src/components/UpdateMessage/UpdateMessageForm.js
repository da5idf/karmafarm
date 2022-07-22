import React, { useState } from 'react';

import './UpdateMessageForm.css';
import { csrfFetch } from '../../store/csrf';
import { toggleConfirm } from '../../utils';

export default function UpdateMessageForm({ userId }) {

    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const submitUpdate = async (e) => {
        e.preventDefault();

        if (!validateUpdate()) return;

        await csrfFetch('/api/updateMessage', {
            method: "POST",
            "Content-Type": "application/json",
            body: JSON.stringify({ text, userId })
        })

        toggleConfirm("weekly-msg-confirmation-modal");
        setText("");
    }

    const validateUpdate = () => {
        let valid = true;

        if (text.length <= 10) {
            setError("Minimum 10 characters");
            valid = false;
        }

        setTimeout(() => {
            setError("")
        }, 3000)

        return valid;
    }

    return (
        <form id="weekly-msg-form-hero" className="green-bg" onSubmit={submitUpdate}>
            <div
                id="weekly-msg-form-title"
                className="page-subtitle"
            >
                Send an update to your clients</div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                minLength="10"
                id="weekly-msg-text"
            />
            <div id="weekly-msg-error-submit-container">
                <div id="weekly-msg-errors">
                    {error && <div id="weekly-msg-error">{error}</div>}
                </div>
                <button
                    id="weekly-msg-submit-button"
                    className="basic-button"
                    type="submit"
                >
                    Send update
                </button>
            </div>
            <div id="weekly-msg-confirmation-modal" className="appear-from-right">
                <div>Update delivered!</div>
            </div>
        </form>
    )
}
