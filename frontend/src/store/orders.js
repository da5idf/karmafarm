import { csrfFetch } from "./csrf";

const NEW_ORDER = "orders/NEW"
const GET_ONE_ORDER = "orders/GET/ONE"
const GET_ALL_ORDERS = "orders/GET/ALL"
const GET_RESTAURANT_ORDERS = "orders/GET";

export const getOneOrder = (orderId) => async (dispatch) => {
    const res = await csrfFetch(`/api/orders/${orderId}`)
    const order = await res.json();

    dispatch(hydrateOneOrder(order));
}

const hydrateOneOrder = (order) => ({
    type: GET_ONE_ORDER,
    order
})

export const createOrder = (restaurantId) => async (dispatch) => {
    const res = await csrfFetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            restaurantId,
            submitted: false,
            delivered: false,
            paid: false,
        })
    })

    const order = await res.json();
    dispatch(newOrder(order))
    return order;
}

const newOrder = (order) => ({
    type: NEW_ORDER,
    order
})

export const getRestaurantOrders = (restaurantId) => async (dispatch) => {
    const response = await csrfFetch(`/api/restaurants/${restaurantId}/orders`);
    const orders = await response.json();

    dispatch(restaurantOrders(orders));
}

const restaurantOrders = orders => ({
    type: GET_RESTAURANT_ORDERS,
    orders
})

const initialState = {
    all: {},
    restaurantOrders: {},
    thisOrder: {},
};

const orderReducer = (state = initialState, action) => {

    let newState;
    switch (action.type) {
        case NEW_ORDER:
            newState = Object.assign({}, state);
            newState.thisOrder = action.order
            return newState;
        case GET_ONE_ORDER:
            newState = Object.assign({}, state);
            newState.thisOrder = action.order
            return newState;
        case GET_ALL_ORDERS:
            return state;
        case GET_RESTAURANT_ORDERS:
            newState = Object.assign({}, state);
            action.orders.forEach(order => {
                newState.restaurantOrders[order.id] = order
            })
            return newState;
        default:
            return state;
    }
}

export default orderReducer;