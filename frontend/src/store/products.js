import { csrfFetch } from "./csrf";

const GET_ALL_PRODUCTS = "products/GET/ALL";
const ADD_UPDATE_PRODUCT = "products/ADD/NEW";
const DELETE_PRODUCT = "product/DELETE"

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
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("pricePerPound", product.pricePerPound);
    formData.append("type", product.type);
    formData.append("active", product.active);
    formData.append("farmerId", product.farmerId);
    formData.append("image", product.image);

    const response = await csrfFetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData
    })

    if (response.ok) {
        const product = await response.json();
        dispatch(addOrUpdateProduct(product))
    }
}

export const updateProduct = (product) => async (dispatch) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("pricePerPound", product.pricePerPound);
    formData.append("type", product.type);
    formData.append("active", product.active);
    formData.append("farmerId", product.farmerId);

    if (product.image) {
        formData.append("image", product.image);
    }

    const response = await csrfFetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData
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

export const deleteProduct = (productId) => async (dispatch) => {
    const response = await csrfFetch(`/api/products/${productId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deleteProductFromStore(productId))
    }
}

const deleteProductFromStore = (productId) => ({
    type: DELETE_PRODUCT,
    productId
})

const initialState = {
    all: {},
    one: {}
}

const productReducer = (state = initialState, action) => {
    let newState;
    newState = Object.assign({}, state);
    let newAll = Object.assign({}, state.all);

    switch (action.type) {
        case GET_ALL_PRODUCTS:
            action.products.forEach(product => {
                newAll[product.id] = product
            });
            newState.all = newAll
            return newState;
        case ADD_UPDATE_PRODUCT:
            newAll[action.product.id] = action.product;
            newState.all = newAll;
            return newState;
        case DELETE_PRODUCT:
            newAll = Object.assign({}, state.all);
            delete newAll[action.productId];
            newState.all = newAll;
            return newState;
        default:
            return state;
    }
}

export default productReducer;