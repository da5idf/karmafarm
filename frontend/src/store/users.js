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
    const response = await csrfFetch(`/api/user/${userId}/chat`)

    if (response.ok) {
        const users = await response.json();
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
    let newState;
    let actionRestaurant;
    let newChatProfiles = {};

    switch (action.type) {
        case GET_USER_RESTAURANTS:
            newState = Object.assign({}, state);
            actionRestaurant = action.restaurant
            newState.restaurant = actionRestaurant;
            return newState;
        case GET_CHAT_PROFILES:
            newState = Object.assign({}, state);
            action.users.forEach(user => null)
        default:
            return state;
    }
}

export default userReducer;