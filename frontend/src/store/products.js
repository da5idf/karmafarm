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
    all: {},
    one: {}
}

const productReducer = (state = initialState, action) => {
    let newState;
    let newAll = {};

    switch (action.type) {
        case GET_ALL_PRODUCTS:
            newState = Object.assign({}, state);
            action.products.forEach(product => {
                newAll[product.id] = product
            });
            newState.all = newAll
            return newState;
        default:
            return state;
    }
}

export default productReducer;