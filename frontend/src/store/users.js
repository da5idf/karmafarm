import { csrfFetch } from "./csrf"

const GET_RESTAURANT = "user/RESTAURANT"

export const getUserRestaurants = (userId) => async (dispatch) => {
    console.log(userId)
    const response = await csrfFetch(`api/users/${userId}/restaurants`)
    console.log("do we reach here?")

    const data = response.json()
    console.log(data)
}