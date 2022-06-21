import { csrfFetch } from "./csrf"

const GET_USER_RESTAURANTS = "user/RESTAURANT";

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

const initialState = {
    restaurant: {}
}

const userReducer = (state = initialState, action) => {
    let newState;
    let actionRestaurant;

    switch (action.type) {
        case GET_USER_RESTAURANTS:
            newState = Object.assign({}, state);
            actionRestaurant = action.restaurant
            newState.restaurant = actionRestaurant;
            return newState;
        default:
            return state;
    }
}

export default userReducer;