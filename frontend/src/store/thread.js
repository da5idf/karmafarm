import { csrfFetch } from "./csrf"

const ALL_THREADS = 'threads/ALL';
const NEW_MESSAGE = 'thread/NEW/MESSAGE';

export const getAllThreads = () => async (dispatch) => {
    const response = await csrfFetch('api/threads');

    if (response.ok) {
        const threads = await response.json();

        dispatch(hydrateThreads(threads));
    }
}

const hydrateThreads = (threads) => ({
    type: ALL_THREADS,
    threads
})

export const newThreadMessage = (message, members) => ({
    type: NEW_MESSAGE,
    message,
    members,
})

const initialState = {};

const threadReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case ALL_THREADS:
            action.threads.forEach(thread => {
                newState[thread.members] = thread;
            })
            return newState;
        case NEW_MESSAGE:
            // lots of nested structures to work through in order
            // for state to update correctly
            const thread = Object.assign({}, newState[action.members])
            const threadMsgs = [...thread.Messages] || [];
            threadMsgs.push(action.message);
            thread.Messages = threadMsgs;
            newState[action.members] = thread;
            return newState;
        default:
            return state
    }
}

export default threadReducer;