import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ChatProfileCard({ profile, setInMessage, members, setMembers, setHeader }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        // order ids numerically so thread ID always returns the same.
        // User 1 clicking User 4 -> 1-4
        // User 4 clicking User 1 -> 1-4    NOT 4-1

        // dispatch(getLastMsg(orderedMembers))
    }, [dispatch])

    const openRoom = () => {
        setInMessage(true);
        setHeader(profile.name);
        const orderedMembers = [sessionUser.id, profile.id].sort().join("-")
        setMembers(orderedMembers);
    }

    return (
        <div
            className="chat-profile-card"
            onClick={openRoom}
        >
            <div>{profile.name}</div>
        </div>
    )
}

export default ChatProfileCard;