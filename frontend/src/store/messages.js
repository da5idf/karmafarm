import { csrfFetch } from "./csrf";

import { updateReadMessages } from "./thread";

export const newMessage = ({ members, userId, text }) => async (dispatch) => {
    const response = await csrfFetch("/api/messages", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify({
            members,
            userId,
            text
        })
    })

    return await response.json()
    // add message to thread and store from socket event from backend.
}

export const markAsRead = (threadId, userId) => async (dispatch) => {
    const response = await csrfFetch(`api/messages/threads/${threadId}`, {
        method: "PATCH",
        "Content-Type": "application/json",
        body: JSON.stringify({
            userId
        })
    })

    if (response.ok) {
        const { updatedMessageIds, members, userId, readCount } = await response.json();
        dispatch(updateReadMessages(updatedMessageIds, members, userId, readCount));
    }
}