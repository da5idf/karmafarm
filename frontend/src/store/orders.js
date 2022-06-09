import { csrfFetch } from "./csrf";

const GET_ALL_ORDERS = "orders/GET/ALL"
const GET_ORDERS = "orders/GET";

export const getRestaurantOrders = (restaurantId) => async (dispatch) => {
    const response = await csrfFetch(`/api/restaurants/${restaurantId}/orders`);
    const orders = await response.json();

    dispatch(restaurantOrders(orders));
}

const restaurantOrders = orders => ({
    type: GET_ORDERS,
    orders
})

const initialState = {
    allOrders: {},
    restaurantOrders: {},
    oneOrder: {},
};

const orderReducer = (state = initialState, action) => {

    let newState;
    switch (action.type) {
        case GET_ALL_ORDERS:
            return state;
        case GET_ORDERS:
            newState = Object.assign({}, state);
            action.orders.forEach(order => {
                newState.restaurantOrders[order.id] = order
            })
        default:
            return state;
    }
}

export default orderReducer;