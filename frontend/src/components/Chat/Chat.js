import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./Chat.css"
import ChatBox from "./ChatBox";
import { getChatProfiles } from "../../store/users"

function Chat({ user }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChatProfiles(user.id))
    }, [dispatch])

    const [viewChat, setViewChat] = useState(false);

    const iconName = viewChat ? "fa-x larger-icon" : "fa-comments"

    return (
        <div id="chat-hero">
            {viewChat && <ChatBox />}
            <div id="chat-icon-container" className="yellow-bg">
                <i
                    className={`fa-solid ${iconName} chat-toggle green-text`}
                    onClick={() => setViewChat(!viewChat)}
                ></i>
            </div>
        </div >
    )
}

export default Chat;