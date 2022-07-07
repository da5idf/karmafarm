import React from 'react';

function ChatMessage({ message, sessionUser }) {

    const displaySide = sessionUser.id === message.userId ? "right" : "left"

    return (
        <div className={`chat-msg ${displaySide}`}>
            {message.text}
        </div>
    )
}

export default ChatMessage;