import React from "react";
import { useSelector } from "react-redux";

function ChatProfileCard({ profile, setInMessage, setThreadId, setHeader }) {
    const sessionUser = useSelector(state => state.session.user)

    const getInitials = () => {
        const names = profile.name.split(" ");
        return `${names[0][0]}${names[1][0]}`
    }

    const openRoom = () => {
        setInMessage(true);
        setThreadId(`${profile.id}-${sessionUser.id}`);
        setHeader(profile.name);
    }

    return (
        <div
            className="chat-profile-card"
            onClick={openRoom}
        >
            <div>{profile.name}</div>
            <div>4</div>
        </div>
    )
}

export default ChatProfileCard;