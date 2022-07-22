import { csrf, csrfFetch } from "./csrf";

const GET_UPDATE_MESSAGES = "updateMessage/NEW";
const MODIFY_UPDATE_MESSAGE = "updateMessage/MODIFY"

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

const initialState = []

export default function updateMessagesReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case GET_UPDATE_MESSAGES:
            newState = action.messages;
            return newState;
        case MODIFY_UPDATE_MESSAGE:
            newState = [...state];
            // from GET_UPDATE_MESSAGES, 0 idx guarantees newest update
            newState[0] = action.update;
            return newState;
        default:
            return state
    }
}