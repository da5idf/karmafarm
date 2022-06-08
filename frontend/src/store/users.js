import { csrfFetch } from "./csrf"

const GET_RESTAURANT = "user/RESTAURANT"

const getUserRestaurants = (userId) => async (dispatch) => {
    const restaurants = await csrfFetch(`/users/${userId}/restaurants`)
}