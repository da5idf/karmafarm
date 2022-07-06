import { csrfFetch } from "./csrf"

const NEW_THREAD = 'thread/NEW'
const THREAD_MESSAGES = 'thread/MESSAGES'

// const createNewThread = (members) => async (dispatch) => {
//     const response = await csrfFetch('/api/threads', {
//         method: "POST",
//         "Conttent-Type": "application/json",
//         body: JSON.stringify(members)
//     })

//     if (response.ok) {
//         thread = await response.json();
//     }
// }

export const getThreadMessages = (members) => async (dispatch) => {
    const response = await csrfFetch(`/api/threads/${members}/messages`)

    const messages = await response.json();

    hydrateThreadMessages(messages)
}

const hydrateThreadMessages = (messages) => ({
    type: THREAD_MESSAGES,
    messages
})

const initialState = {
    messages: {}
};

const threadReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
    const newMessages = Object.assign({}, state);

    switch (action.type) {
        case THREAD_MESSAGES:
            action.messages.forEach(message => {
                newMessages[message.id] = message
            })
            newState.messages = newMessages;
            return newState
        default:
            return state
    }
}