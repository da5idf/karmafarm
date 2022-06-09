import { csrfFetch } from "./csrf";

const GET_ALL_PRODUCTS = "products/GET/ALL";

export const getAllProducts = () => async (dispatch) => {
    const result = await csrfFetch("/api/products");

    const products = await result.json();
    dispatch(hydrateAllProducts(products));
}

const hydrateAllProducts = (products) => ({
    type: GET_ALL_PRODUCTS,
    products
})

const initialState = {
    all: [],
    one: {}
}

export const productReducer = (state = initialState, action) => {
    let newState;
    let all = {};

    switch (action.type) {
        case GET_ALL_PRODUCTS:
            newState = Object.assign({}, state);
            action.products.forEach(product => {
                newState.all[product.id] = product
            });
            return newState;
        default:
            return state;
    }
}