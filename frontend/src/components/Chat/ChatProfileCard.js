import React from "react";

function ChatProfileCard({ profile, setInMessage }) {

    const getInitials = () => {
        const names = profile.name.split(" ");
        return `${names[0][0]}${names[1][0]}`
    }

    return (
        <div className="chat-profile-card">
            <div>{getInitials()}</div>
        </div>
    )
}

export default ChatProfileCard;