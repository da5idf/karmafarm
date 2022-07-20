import React from "react";
import { useSelector } from "react-redux";

function ChatProfileCard({ profile, setInMessage, setMembers, setHeader }) {
    const sessionUser = useSelector(state => state.session.user)
    const threads = useSelector(state => state.threads);

    // order ids numerically so thread ID always returns the same.
    // User 1 clicking User 4 -> 1-4
    // User 4 clicking User 1 -> 1-4    NOT 4-1
    const orderedMembers = [sessionUser.id, profile.id].sort().join("-")
    const last = threads[orderedMembers]?.last
    const unreadCount = threads[orderedMembers]?.unreadCount;

    const openRoom = () => {
        setInMessage(true);
        setHeader(profile.name);
        setMembers(orderedMembers);
    }

    return (
        <div
            className="chat-profile-card"
            onClick={openRoom}
        >
            <div className="chat-name">{profile.name}</div>
            <div className="last-msg">{last}</div>
            {unreadCount > 0 &&
                <div className="unreadCount red-bg">
                    <div className="white-text">{unreadCount}</div>
                </div>
            }
        </div>
    )
}

export default ChatProfileCard;