import { csrf, csrfFetch } from "./csrf";

const NEW_UPDATE_MESSAGE = "updateMessage/NEW";
const GET_UPDATE_MESSAGES = "updateMessage/GET/ALL";
const MODIFY_UPDATE_MESSAGE = "updateMessage/MODIFY";
const DELETE_UPDATE = "updateMessage/DELETE"

export const newUpdateMessage = (text, userId) => async (dispatch) => {
    const response = await csrfFetch('/api/updateMessage', {
        method: "POST",
        "Content-Type": "application/json",
        // need the userId to mark all other user's read column as false
        body: JSON.stringify({ text, userId })
    })

    if (response.ok) {
        const message = await response.json();
        dispatch(hydrateNewMessage(message));
    }
}

const hydrateNewMessage = (message) => ({
    type: NEW_UPDATE_MESSAGE,
    message
})

export const getUpdateMessages = () => async (dispatch) => {
    const response = await csrfFetch("/api/updateMessage");

    if (response.ok) {
        const messages = await response.json();
        dispatch(hydrateUpdateMessages(messages));
        return messages
    }
}

const hydrateUpdateMessages = (messages) => ({
    type: GET_UPDATE_MESSAGES,
    messages
})

export const modifyLatestUpdate = ({ updateId, text }) => async (dispatch) => {
    const response = await csrfFetch(`/api/updateMessage/${updateId}`, {
        method: "PATCH",
        "Content-Type": "application/json",
        body: JSON.stringify({ text })
    })

    if (response.ok) {
        const update = await response.json();
        dispatch(hydrateUpdateModification(update));
    }
}

const hydrateUpdateModification = (update) => ({
    type: MODIFY_UPDATE_MESSAGE,
    update
})

export const deleteLastUpdate = (updateId) => async (dispatch) => {
    await csrfFetch(`/api/updateMessage/${updateId}`, {
        method: "DELETE"
    })
    dispatch(hydrateDeleteLastUpdate())
}

const hydrateDeleteLastUpdate = () => ({
    type: DELETE_UPDATE
})

const initialState = []

export default function updateMessagesReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case NEW_UPDATE_MESSAGE:
            newState = [...state];
            newState.unshift(action.message);
            return newState
        case GET_UPDATE_MESSAGES:
            newState = action.messages;
            return newState;
        case MODIFY_UPDATE_MESSAGE:
            newState = [...state];
            // from GET_UPDATE_MESSAGES, 0 idx guarantees newest update
            newState[0] = action.update;
            return newState;
        case DELETE_UPDATE:
            newState = [...state]
            newState.shift();
            return newState;
        default:
            return state
    }
}