import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"

import ChatProfileCard from "./ChatProfileCard";
import Thread from "./Thread";

function ChatBox({ chatProfiles }) {

    const [inMessage, setInMessage] = useState(false);
    const [header, setHeader] = useState("Messages");
    const [threadId, setThreadId] = useState();

    const content = inMessage ?
        <Thread
            threadId={threadId}
            setHeader={setHeader}
            setInMessage={setInMessage}
        />
        :
        chatProfiles.map(profile => {
            return <ChatProfileCard
                key={uuidv4()}
                profile={profile}
                setHeader={setHeader}
                setInMessage={setInMessage}
                setThreadId={setThreadId}
            />
        });

    return (
        <div
            id="chat-box"
            className="white-bg"
        >
            <div id="chat-header" className="green-bg white-text page-subtitle">
                {header}
            </div>
            <div id="chat-box-content">
                {content}
            </div>
        </div>
    )
}

export default ChatBox;