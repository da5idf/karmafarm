import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './UpdateMessageForm.css';
import { toggleConfirm } from '../../utils';
import { newUpdateMessage } from '../../store/updateMessages';
import DragAndDrop from '../DragAndDrop/DragAndDrop';

export default function UpdateMessageForm({ userId }) {
    const dispatch = useDispatch();

    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [file, setFile] = useState("");

    const submitUpdate = async (e) => {
        e.preventDefault();

        if (!validateUpdate()) return;

        dispatch(newUpdateMessage(text, userId, file))

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
            <div
                className="updateMessage-form-field"
            >
                <DragAndDrop setFile={setFile} file={file} />
            </div>
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
