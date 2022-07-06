import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid"
import { getAllThreads } from "../../store/thread";

import ChatProfileCard from "./ChatProfileCard";
import Thread from "./Thread";

function ChatBox({ chatProfiles }) {
    const dispatch = useDispatch();

    const [inMessage, setInMessage] = useState(false);
    const [header, setHeader] = useState("Messages");
    const [members, setMembers] = useState("");

    useEffect(() => {
        dispatch(getAllThreads())
    }, [dispatch])

    const closeThread = () => {
        setInMessage(false);
        setHeader("Messges");
    }

    const content = inMessage ?
        <Thread
            members={members}
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
                members={members}
                setMembers={setMembers}
            />
        });

    return (
        <div
            id="chat-box"
            className="white-bg"
        >
            <div id="chat-header" className="green-bg white-text page-subtitle">
                {header}
                {inMessage &&
                    <i
                        className="fa-solid fa-x"
                        onClick={closeThread}
                    ></i>}
            </div>
            <div id="chat-box-content">
                {content}
            </div>
        </div>
    )
}

export default ChatBox;