import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "./Cart.css"
import { getOneOrder } from "../../store/orders";
import ProductDetail from "../ProductDetail";
import { getOrderProducts } from "../../store/orders_products";
import { toggleSubmission } from "../../store/orders"

function Cart() {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);

    const order = useSelector(state => state.orders.thisOrder);
    const orderRecordObjs = useSelector(state => state.orders_products.thisOrder)
    const orderRecords = Object.values(orderRecordObjs)

    const restaurant = order.Restaurant

    useEffect(() => {
        dispatch(getOneOrder(orderId))
            .then(() => dispatch(getOrderProducts(orderId)))
            .then(() => setIsLoaded(true))

    }, [dispatch, orderId])

    const addToOrder = () => {
        history.push(`/orders/${orderId}/add`)
    }

    const submitOrder = () => {
        dispatch(toggleSubmission(orderId, true))
            .then(() => history.push(`/orders/${orderId}`))
    }

    if (!isLoaded || !restaurant) {
        return (
            <h1>Loading</h1>
        )
    }

    return (
        <div className="page-hero">
            <div className="page-title">Shoppping Cart</div>
            <div className="page-subtitle">Order #{`${orderId}`}</div>
            <div id="cart-restaurant-name">{restaurant.name}</div>
            <div id="cart-restaurant-address">{restaurant.address}</div>
            <button
                id="add-to-order-button"
                className="basic-button"
                onClick={addToOrder}
            >
                Add to Order
            </button>
            <div id="cart-product-details-container">
                {
                    orderRecords?.map(record => {
                        return <ProductDetail record={record} key={record.id} />
                    })
                }
            </div>
            <button
                id="cart-submit-order"
                className="blue-button"
                onClick={submitOrder}
            >
                Submit Order
            </button>
        </div>
    )
}

export default Cart;