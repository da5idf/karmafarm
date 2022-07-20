import { csrfFetch } from "./csrf"

const ALL_THREADS = 'threads/ALL';
const NEW_MESSAGE = 'thread/NEW/MESSAGE';

export const getAllThreads = (userId) => async (dispatch) => {
    const response = await csrfFetch(`api/threads/${userId}`);

    if (response.ok) {
        const { threads, totalUnread } = await response.json();
        dispatch(hydrateThreads(threads, totalUnread));
    }
}

const hydrateThreads = (threads, totalUnread) => ({
    type: ALL_THREADS,
    threads,
    totalUnread
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
            newState.totalUnread = action.totalUnread;
            return newState;
        case NEW_MESSAGE:
            // lots of nested structures to work through in order
            // for state to update correctly
            const thread = Object.assign({}, newState[action.members])
            // this ternary catches new threads when thread.Messages = undefined
            const threadMsgs = thread.Messages ? [...thread.Messages] : [];
            threadMsgs.push(action.message);
            thread.Messages = threadMsgs;
            // update last msg on thread
            thread.last = action.message.text
            newState[action.members] = thread;
            return newState;
        default:
            return state
    }
}

export default threadReducer;