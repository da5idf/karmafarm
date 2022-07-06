import { csrfFetch } from "./csrf"

const THREAD_MESSAGES = 'thread/MESSAGES';
const NEW_MESSAGE = 'thread/NEW/MESSAGE';

export const getThreadMessages = (members) => async (dispatch) => {
    const response = await csrfFetch(`/api/threads/${members}/messages`)

    const messages = await response.json();

    dispatch(hydrateThreadMessages(messages))
}

const hydrateThreadMessages = (messages) => ({
    type: THREAD_MESSAGES,
    messages
})

export const newThreadMessage = (message) => ({
    type: NEW_MESSAGE,
    message
})

const initialState = {
    messages: {}
};

const threadReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
    const newMessages = Object.assign({}, state.messages);

    switch (action.type) {
        case THREAD_MESSAGES:
            action.messages.forEach(message => {
                newMessages[message.id] = message
            })
            newState.messages = newMessages;
            return newState
        case NEW_MESSAGE:
            newMessages[action.message.id] = action.message;
            newState.messages = newMessages;
            return newState;
        default:
            return state
    }
}

export default threadReducer;