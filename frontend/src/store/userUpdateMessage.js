import { csrfFetch } from "./csrf";

const GET_USER_UPDATE = "user_updateMessage/GET";
const MARK_UPDATE_AS_READ = "user_updateMessage/MARK/READ"

export const getUpdateMessageModal = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/user_updatemessage/${userId}`);

    if (response.ok) {
        const { read, text, imgUrl } = await response.json();
        dispatch(hydrateUserUpdateModal(read, text, imgUrl));
        return { read, text, imgUrl }
    }
}

const hydrateUserUpdateModal = (read, text, imgUrl) => ({
    type: GET_USER_UPDATE,
    read,
    text,
    imgUrl
})

export const markUserUpdateMessageAsRead = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/user_updatemessage/${userId}`, {
        method: "PATCH"
    })

    if (response.ok) {
        dispatch(hydrateMarkAsRead());
    }
}

const hydrateMarkAsRead = () => ({
    type: MARK_UPDATE_AS_READ
})

const initialState = {};

export default function userUpdateMessageReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case GET_USER_UPDATE:
            newState.read = action.read;
            newState.text = action.text;
            newState.imgUrl = action.imgUrl;
            return newState
        case MARK_UPDATE_AS_READ:
            newState.read = true;
            return newState
        default:
            return state
    }
}