import { csrfFetch } from "./csrf";

const NEW_ORDER = "orders/NEW";
const GET_ONE_ORDER = "orders/GET/ONE";
const GET_ALL_ORDERS = "orders/GET/ALL";
const GET_RESTAURANT_ORDERS = "orders/RESTAURANT/GET";
const UPDATE_ORDER = "orders/UPDATE";
const DELETE_ORDER = "orders/DELETE"

export const getAllOrders = () => async (dispatch) => {
    const res = await csrfFetch('/api/orders');
    const orders = await res.json();

    dispatch(hydrateAllOrders(orders));
}

const hydrateAllOrders = (orders) => ({
    type: GET_ALL_ORDERS,
    orders
})

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

export const toggleSubmission = (orderId, submitted) => async (dispatch) => {
    const response = await csrfFetch(`/api/orders/${orderId}/submit/${submitted}`, {
        method: "PUT",
    })

    if (response.ok) {
        const order = await response.json();
        dispatch(updateOrder(order));
    }
}

export const addProductToOrder = (newRecord) => async (dispatch) => {

    const { productId, orderId, userId, weight } = newRecord

    const res = await csrfFetch("/api/orders_products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            orderId,
            productId,
            userId,
            weight
        })
    })

    const order = await res.json()
    dispatch(updateOrder(order));
}

export const deleteRecordFromOrder = (recordId) => async (dispatch) => {
    const res = await csrfFetch(`/api/orders_products/${recordId}`, {
        method: "DELETE"
    })

    const order = await res.json();

    dispatch(updateOrder(order))
}

export const updateRecordOnOrder = (recordId, weight) => async (dispatch) => {
    const res = await csrfFetch(`/api/orders_products/${recordId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            weight
        })
    })

    const order = await res.json();

    dispatch(updateOrder(order))
}

export const updateDeliveryOnOrder = (orderId, dateOfDelivery) => async (dispatch) => {
    const res = await csrfFetch(`/api/orders/${orderId}/delivery`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            dateOfDelivery
        })
    })

    const order = await res.json();

    dispatch(updateOrder(order))
}

export const togglePaymentOnOrder = (orderId, paid) => async (dispatch) => {
    const response = await csrfFetch(`/api/orders/${orderId}/paid/${paid}`, {
        method: "PUT",
    })

    if (response.ok) {
        const order = await response.json();
        dispatch(updateOrder(order));
    }
}

const updateOrder = (order) => ({
    type: UPDATE_ORDER,
    order
})

export const deleteWholeOrder = (orderId) => async (dispatch) => {
    const res = await csrfFetch(`/api/orders/${orderId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(removeOrderFromStore(orderId))
    }
}

const removeOrderFromStore = (orderId) => ({
    type: DELETE_ORDER,
    orderId
})

const initialState = {
    all: [],
    restaurantOrders: [],
    thisOrder: {},
};

const orderReducer = (state = initialState, action) => {
    let newState;
    let newAll = [];
    let updatedOrder = {};
    let updatedRestOrders = [];

    switch (action.type) {
        case NEW_ORDER:
            newState = Object.assign({}, state);
            newState.thisOrder = action.order
            return newState;
        case GET_ONE_ORDER:
            newState = Object.assign({}, state);
            updatedOrder = action.order
            newState.thisOrder = updatedOrder
            return newState;
        case GET_ALL_ORDERS:
            newState = Object.assign({}, state);
            action.orders.forEach(order => {
                newAll.push(order)
            })
            newState.all = newAll;
            return newState;
        case GET_RESTAURANT_ORDERS:
            newState = Object.assign({}, state);
            action.orders.forEach(order => {
                updatedRestOrders[order.id] = order;
            })
            newState.restaurantOrders = updatedRestOrders;
            return newState;
        case UPDATE_ORDER:
            newState = Object.assign({}, state);
            updatedOrder = action.order
            newState.thisOrder = updatedOrder
            return newState;
        case DELETE_ORDER:
            newState = Object.assign({}, state);
            updatedRestOrders = Object.assign({}, state.restaurantOrders)
            delete updatedRestOrders[action.orderId];
            newState.restaurantOrders = updatedRestOrders;
            return newState;
        default:
            return state;
    }
}

export default orderReducer;