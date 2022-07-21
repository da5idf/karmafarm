import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { newMessage } from "../../store/messages";
import ChatMessage from "./ChatMessage";

function Thread({ members }) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const sessionUser = useSelector(state => state.session.user);
    const threads = useSelector(state => state.threads);

    let messages = [];
    if (threads[members]) {
        const messageObjs = threads[members].Messages
        messages = Object.values(messageObjs);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validated = validateText();
        if (validated) {
            dispatch(newMessage({ members, userId: sessionUser.id, text }))
            setText("");
        }
    }

    const validateText = () => {
        if (!text.length) return false
        else return true;
    }

    const getMessages = () => {
        return messages.map(message => {
            return (
                <ChatMessage
                    key={uuidv4()}
                    message={message}
                    sessionUser={sessionUser}
                />
            )
        }
        )
    }

    return (
        <div id="messages-container">
            <div id="messages">
                {
                    getMessages()
                }
            </div>
            <form
                id="new-message"
                onSubmit={handleSubmit}
            >
                <div id="new-message-div">
                    <input
                        id="new-message-text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        minLength="1"
                    ></input>
                    <button
                        type="submit"
                    >
                        Send
                    </button>

                </div>
            </form>
        </div>
    )
}

export default Thread;