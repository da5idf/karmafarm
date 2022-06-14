import { csrfFetch } from "./csrf";

const GET_ALL_PRODUCTS = "products/GET/ALL";
const ADD_UPDATE_PRODUCT = "products/ADD/NEW"

export const getAllProducts = () => async (dispatch) => {
    const result = await csrfFetch("/api/products");

    const products = await result.json();
    dispatch(hydrateAllProducts(products));
}

const hydrateAllProducts = (products) => ({
    type: GET_ALL_PRODUCTS,
    products
})

export const createProduct = (product) => async (dispatch) => {
    const response = await csrfFetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product })
    })

    if (response.ok) {
        const product = await response.json();
        dispatch(addOrUpdateProduct(product))
    }
}

export const updateProduct = (product) => async (dispatch) => {
    console.log(product);
    const response = await csrfFetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product })
    })

    if (response.ok) {
        const product = await response.json();
        dispatch(addOrUpdateProduct(product));
    }
}

const addOrUpdateProduct = (product) => ({
    type: ADD_UPDATE_PRODUCT,
    product
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
        case ADD_UPDATE_PRODUCT:
            newState = Object.assign({}, state);
            newAll = Object.assign({}, state.all)
            newAll[action.product.id] = action.product
            newState.all = newAll;
            return newState;
        default:
            return state;
    }
}

export default productReducer;