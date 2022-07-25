import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Chat.css"
import ChatBox from "./ChatBox";
import { getChatProfiles } from "../../store/users"
import { getAllThreads } from "../../store/thread";

function Chat({ user }) {
    const dispatch = useDispatch();

    const chatObjs = useSelector(state => state.users.chatProfiles)
    const chatProfiles = Object.values(chatObjs);
    const totalUnread = useSelector(state => state.threads.totalUnread)

    useEffect(() => {
        dispatch(getChatProfiles(user.id))
        dispatch(getAllThreads(user.id))
    }, [dispatch, user.id])

    const [viewChat, setViewChat] = useState(false);

    const iconName = viewChat ? "fa-solid fa-x" : "fa-regular fa-comments"

    return (
        <div
            id="chat-hero"
            viewchat={viewChat ? "true" : "false"}
        >
            {viewChat && <ChatBox chatProfiles={chatProfiles} />}
            <div
                id="chat-icon-container"
                className="yellow-bg"
                onClick={(e) => {
                    e.stopPropagation();
                    setViewChat(!viewChat)
                }}
            >
                <i
                    className={`${iconName}`}
                ></i>
                {!viewChat && totalUnread !== undefined && totalUnread[user.id] > 0 &&
                    <div
                        id="totalUnread"
                        className="red-bg white-text"
                    >
                        {totalUnread[user.id]}
                    </div>
                }
            </div>
        </div >
    )
}

export default Chat;