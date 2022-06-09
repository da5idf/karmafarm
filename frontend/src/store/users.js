import { csrfFetch } from "./csrf"

const GET_USER_RESTAURANTS = "user/RESTAURANT";

export const getUserRestaurants = (userId) => async (dispatch) => {
    console.log(userId)
    const response = await csrfFetch(`api/users/${userId}/restaurants`)

    const user = await response.json()
    const restaurants = user.Restaurant

    dispatch(hydrateUserRestaurants(restaurants))
}

const hydrateUserRestaurants = (restaurants) => ({
    type: GET_USER_RESTAURANTS,
    restaurants
})

const initialState = {
    userRestaurants: {}
}

const userReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_USER_RESTAURANTS:
            newState = Object.assign({}, state);
            console.log("in reducer", action.restaurants)
            newState.userRestaurants = action.restaurants;
            return newState;
        default:
            return state;
    }
}

export default userReducer;