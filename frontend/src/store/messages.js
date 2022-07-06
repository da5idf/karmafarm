import { csrfFetch } from "./csrf";

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
    // add message to thread and store from socket event.
}