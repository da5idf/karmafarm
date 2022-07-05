import Chat from "../components/Chat/Chat";
import { csrfFetch } from "./csrf"

const GET_USER_RESTAURANTS = "user/RESTAURANT";
const GET_CHAT_PROFILES = "user/CHAT/PROFILES"

export const getUserRestaurants = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/restaurants`)
        .catch((e) => {

        });

    if (response.ok) {
        const restaurant = await response.json()
        dispatch(hydrateUserRestaurants(restaurant))
        return restaurant;
    }

}

const hydrateUserRestaurants = (restaurant) => ({
    type: GET_USER_RESTAURANTS,
    restaurant
})

export const getChatProfiles = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/chat`)

    if (response.ok) {
        const users = await response.json();
        console.log("in thunk", users)
        dispatch(hydrateChatProfiles(users));
        return users;
    }
}

const hydrateChatProfiles = (users) => ({
    type: GET_CHAT_PROFILES,
    users
})

const initialState = {
    restaurant: {},
    chatProfiles: {}
}

const userReducer = (state = initialState, action) => {
    let newState = Object.assign({}, state);
    let actionRestaurant;
    let newChatProfiles = Object.assign({}, state.chatProfiles);

    switch (action.type) {
        case GET_USER_RESTAURANTS:
            newState.restaurant = action.restaurant;
            return newState;
        case GET_CHAT_PROFILES:
            action.users.forEach(user => {
                newChatProfiles[user.id] = user
            })
            newState.chatProfiles = newChatProfiles;
            return newState;
        default:
            return state;
    }
}

export default userReducer;