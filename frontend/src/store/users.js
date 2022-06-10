import { csrfFetch } from "./csrf"

const GET_USER_RESTAURANTS = "user/RESTAURANT";

export const getUserRestaurants = (userId) => async (dispatch) => {
    const response = await csrfFetch(`api/users/${userId}/restaurants`)

    const restaurants = await response.json()

    dispatch(hydrateUserRestaurants(restaurants))
}

const hydrateUserRestaurants = (restaurants) => ({
    type: GET_USER_RESTAURANTS,
    restaurants
})

const initialState = {
    restaurants: {}
}

const userReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_USER_RESTAURANTS:
            newState = Object.assign({}, state);
            newState.restaurants = action.restaurants;
            return newState;
        default:
            return state;
    }
}

export default userReducer;