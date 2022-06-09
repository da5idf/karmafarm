const { csrfFetch } = require("./csrf")

const GET_ONE = "restaurants/ONE"

const hydrateOne = (restaurant) => ({
    type: GET_ONE,
    restaurant
})

export const getOneRestaurant = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/restaurants/${id}`)

    if (response.ok) {
        const restaurant = response.json();
        dispatch(hydrateOne(restaurant));
    }
}

const initialState = {
    allRestaurants: {},
    oneRestaurant: {},
}

const restaurantReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_ONE:
            newState = Object.assign({}, state);
            newState.oneRestaurant = action.restaurant;
        default:
            return state;
    }
}

export default restaurantReducer;