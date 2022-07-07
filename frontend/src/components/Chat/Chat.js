import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Chat.css"
import ChatBox from "./ChatBox";
import { getChatProfiles } from "../../store/users"

function Chat({ user }) {
    const dispatch = useDispatch();
    const chatObjs = useSelector(state => state.users.chatProfiles)
    const chatProfiles = Object.values(chatObjs);

    useEffect(() => {
        dispatch(getChatProfiles(user.id))
    }, [dispatch, user.id])

    const [viewChat, setViewChat] = useState(false);

    const iconName = viewChat ? "fa-x larger-icon" : "fa-comments"
    const buttonText = viewChat ? "Close chat" : "Chat with the Farm"

    return (
        <div id="chat-hero">
            {viewChat && <ChatBox chatProfiles={chatProfiles} setViewChat={setViewChat} />}
            <div
                id="chat-icon-container"
                className="yellow-bg"
                onClick={(e) => {
                    e.stopPropagation();
                    setViewChat(!viewChat)
                }}
            >
                {buttonText}
                <i
                    className={`fa-solid ${iconName} chat-toggle green-text`}
                ></i>
            </div>
        </div >
    )
}

export default Chat;