import { csrfFetch } from "./csrf"

const ALL_THREADS = 'threads/ALL';
const NEW_MESSAGE = 'thread/NEW/MESSAGE';
const UPDATE_READ = 'thread/MESSAGES/UPDATE/READ'

export const getAllThreads = (userId) => async (dispatch) => {
    const response = await csrfFetch(`api/threads/${userId}`);

    if (response.ok) {
        const { threads, totalUnread } = await response.json();
        dispatch(hydrateThreads(threads, totalUnread, userId));
    }
}

const hydrateThreads = (threads, totalUnread, userId) => ({
    type: ALL_THREADS,
    threads,
    totalUnread,
    userId
})

export const newThreadMessage = (message, members, receiver) => ({
    type: NEW_MESSAGE,
    message,
    members,
    receiver
})

export const updateReadMessages = (updatedMessageIds, members, userId, readCount) => ({
    type: UPDATE_READ,
    updatedMessageIds,
    members,
    userId,
    readCount,
})

const initialState = {};

const threadReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
    let thread;
    let threadMsgs;
    let newTotalUnread;

    switch (action.type) {
        case ALL_THREADS:
            action.threads.forEach(thread => {
                newState[thread.members] = thread;
            })
            newState.totalUnread = {
                [action.userId]: action.totalUnread || 0
            }
            return newState;
        case NEW_MESSAGE:
            // lots of nested structures to work through in order
            // for state to update correctly
            thread = Object.assign({}, newState[action.members])
            // this ternary catches new threads when thread.Messages = undefined
            threadMsgs = thread.Messages ? [...thread.Messages] : [];
            // add the new message and update this thread's msgs
            threadMsgs.push(action.message);
            thread.Messages = threadMsgs;
            // update unread count for this thread, set to {} if empty
            const updatedUnreadCounts = Object.assign({}, thread.unreadCounts || {})
            updatedUnreadCounts[action.receiver] ?
                updatedUnreadCounts[action.receiver]++ :
                updatedUnreadCounts[action.receiver] = 1;
            thread.unreadCounts = updatedUnreadCounts;
            // update total unread count
            // needs to be an obj to key into sender vs receiver
            newTotalUnread = Object.assign({}, newState.totalUnread);
            newTotalUnread[action.receiver] ?
                newTotalUnread[action.receiver]++ :
                newTotalUnread[action.receiver] = 1;
            newState.totalUnread = newTotalUnread;
            // update last msg on thread
            thread.last = action.message.text
            newState[action.members] = thread;
            return newState;
        case UPDATE_READ:
            thread = Object.assign({}, newState[action.members])
            // this ternary catches new threads when thread.Messages = undefined
            threadMsgs = thread.Messages ? [...thread.Messages] : [];
            threadMsgs.forEach(message => {
                if (action.updatedMessageIds.includes(message.id)) {
                    message.read = true;
                }
            })
            thread.Messages = threadMsgs
            thread.unreadCounts[action.userId] = 0; // we just marked all as read
            newState[action.members] = thread;
            // update the total unread count for this user
            newTotalUnread = Object.assign(newState.totalUnread || {});
            newTotalUnread[action.userId] ?
                newTotalUnread[action.userId] -= action.readCount :
                newTotalUnread[action.userId] = 0;
            newState.totalUnread = newTotalUnread;
            return newState;
        default:
            return state
    }
}

export default threadReducer;