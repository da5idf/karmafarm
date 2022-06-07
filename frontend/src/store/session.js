import { csrfFetch } from './csrf';

const SET_USER = "session/setUser"
const REMOVE_USER = "session/removeUser"

const setUserSession = (user) => ({
    type: SET_USER,
    user
});

const removeUserSession = () => ({
    type: REMOVE_USER,
});

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch(
        '/api/session',
        {
            method: 'POST',
            body: JSON.stringify({
                credential,
                password,
            }),
        }
    );
    const data = await response.json();
    dispatch(setUserSession(data.user));
    return response;
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();

    dispatch(setUserSession(data.user))
    return response;
}

export const signupUser = ({ username, email, password }) => async (dispatch) => {
    const response = await csrfFetch(
        '/api/users',
        {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        },
    );

    const data = await response.json();
    dispatch(setUserSession(data.user));
    return response;
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch(
        '/api/session',
        {
            method: 'DELETE',
        }
    );

    dispatch(removeUserSession());
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;