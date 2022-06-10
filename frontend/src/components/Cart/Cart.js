import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Cart.css"
import ProductDetail from "../ProductDetail";
import { toggleSubmission } from "../../store/orders"

function Cart({ props }) {
    const { order, setView, views } = props;
    localStorage.setItem("orderView", views.cartView)

    const orderId = order.id
    const dispatch = useDispatch();

    const orderRecords = order.Orders_Products

    const restaurant = order.Restaurant

    const addToOrder = () => {
        localStorage.setItem("orderView", views.addView)
        setView(views.addView)
    }

    const submitOrder = () => {
        dispatch(toggleSubmission(orderId, true))
        localStorage.setItem("orderView", views.orderView)
        setView(views.orderView)
    }

    return (
        <div className="page-hero">
            <div className="page-content">
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
        </div>
    )
}

export default Cart;