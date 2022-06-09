const { csrfFetch } = require("./csrf")

const GET_ONE = "restaurants/ONE";
const GET_ALL_RESTAURANTS = "restaurants/ALL";

export const getOneRestaurant = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/restaurants/${id}`)

    if (response.ok) {
        const restaurant = await response.json();
        dispatch(hydrateOne(restaurant));
    }
}

const hydrateOne = (restaurant) => ({
    type: GET_ONE,
    restaurant
})

export const getAllRestaurants = () => async (dispatch) => {
    const response = await csrfFetch(`/api/restaurants`)

    if (response.ok) {
        const restaurants = await response.json();
        dispatch(hydrateAll(restaurants))
    }
}

const hydrateAll = (restaurants) => ({
    type: GET_ALL_RESTAURANTS,
    restaurants
})


const initialState = {
    all: {},
    one: {},
}

const restaurantReducer = (state = initialState, action) => {
    let newState;
    let all = {};

    switch (action.type) {
        case GET_ONE:
            newState = Object.assign({}, state);
            newState.one = action.restaurant;
            return newState;
        case GET_ALL_RESTAURANTS:
            newState = Object.assign({}, state);
            action.restaurants.forEach(restaurant => {
                all[restaurant.id] = restaurant
            })
            newState.all = all;
            return newState;
        default:
            return state;
    }
}

export default restaurantReducer;