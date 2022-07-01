import React, { useState } from "react";


import ChatProfileCard from "./ChatProfileCard";

function ChatBox() {

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
            <ChatProfileCard setInMessage={setInMessage} />
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