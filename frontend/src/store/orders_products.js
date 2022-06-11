// import { csrfFetch } from "./csrf"

// const ADD_PRODUCT = "order_product/ADD";
// const SINGLE_ORDER = "order_product/SINGLE/ORDER";
// const DELETE_RECORD = "order_product/DELETE";

// export const addProduct = (newRecord) => async (dispatch) => {

//     const { productId, orderId, userId, weight } = newRecord

//     const res = await csrfFetch("/api/orders_products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             orderId,
//             productId,
//             userId,
//             weight
//         })
//     })

//     const order_product = await res.json()
//     dispatch(hydrateNewItem(order_product));
// }

// const hydrateNewItem = (item) => ({
//     type: ADD_PRODUCT,
//     item
// })

// export const getOrderProducts = (orderId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/orders/${orderId}/orders_products`);

//     const records = await res.json();
//     dispatch(hydrateOrderProducts(records))
// }

// const hydrateOrderProducts = (records) => ({
//     type: SINGLE_ORDER,
//     records
// })

// export const deleteRecord = (recordId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/orders_products/${recordId}`, {
//         method: "DELETE"
//     })

//     const record = await res.json();
//     dispatch(deleteRecordFromStore(record.id))
// }

// const deleteRecordFromStore = (id) => ({
//     type: DELETE_RECORD,
//     id
// })


// const initialState = {
//     all: {},
//     thisOrder: {},
// }

// const ordersProductReducer = (state = initialState, action) => {
//     let newState;
//     let newAll = {};
//     let newOrder = {};

//     switch (action.type) {
//         // case ADD_PRODUCT:
//         //     newState = Object.assign({}, state);
//         //     newState.all[action.item.id] = action.item;
//         //     return newState;
//         case SINGLE_ORDER:
//             newState = Object.assign({}, state);
//             action.records.forEach(record => {
//                 newOrder[record.id] = record
//             })
//             newState.thisOrder = newOrder;
//             return newState;
//         case DELETE_RECORD:
//             newState = Object.assign({}, state);
//             newOrder = Object.assign({}, newState.thisOrder)
//             delete newOrder[action.id]
//             newState.thisOrder = newOrder
//             return newState;
//         default:
//             return state
//     }
// }

// export default ordersProductReducer