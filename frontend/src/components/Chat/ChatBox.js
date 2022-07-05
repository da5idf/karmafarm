import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"

import ChatProfileCard from "./ChatProfileCard";

function ChatBox({ chatProfiles }) {

    const [inMessage, setInMessage] = useState(false);

    const header = (
        <div id="chat-header" className="green-bg">
            {
                inMessage ?
                    <div>Profile Header</div>
                    :
                    <div id="chat-header-title" className="white-text page-subtitle">
                        Messages
                    </div>
            }
        </div>
    )

    const content = (
        <div id="chat-box-content">
            {
                chatProfiles.map(profile => {
                    return <ChatProfileCard
                        key={uuidv4()}
                        profile={profile}
                        setInMessage={setInMessage}
                    />
                }
                )}
        </div>
    )

    return (
        <div
            id="chat-box"
            className="white-bg"
        >
            {header}
            {content}

        </div>
    )
}

export default ChatBox;