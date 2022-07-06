import React from "react";
import { useSelector } from "react-redux";

function ChatProfileCard({ profile, setInMessage, setMembers, setHeader }) {
    const sessionUser = useSelector(state => state.session.user)

    const getInitials = () => {
        const names = profile.name.split(" ");
        return `${names[0][0]}${names[1][0]}`
    }

    const openRoom = () => {
        setInMessage(true);
        setHeader(profile.name);

        // order ids numerically so thread ID always returns the same.
        // User 1 clicking User 4 -> 1-4
        // User 4 clicking User 1 -> 1-4    NOT 4-1
        const orderedMembers = [sessionUser.id, profile.id].sort()
        setMembers(orderedMembers.join("-"));
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