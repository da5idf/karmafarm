import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function Thread({ threadId, setInMessage, setHeader }) {
    const dispatch = useDispatch();

    useEffect(() => {
        // getThreadMessages(threadId);
    }, dispatch)

    return (
        <div
            onClick={() => setInMessage(false)}
        >
            Hello
        </div>
    )
}

export default Thread;