import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getThreadMessages } from "../../store/thread";
import { newMessage } from "../../store/messages";

function Thread({ members }) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getThreadMessages(members));
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(newMessage({ members, userId: sessionUser.id, text }))
    }

    return (
        <div id="messages-container">
            <div id="messages">

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