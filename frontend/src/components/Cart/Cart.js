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
    const total = orderRecords.reduce((accum, record) => {
        accum += record.weight * record.Product.pricePerPound
        return accum
    }, 0)
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

    const getFormattedNumber = (number) => {
        const numString = number.toString();
        const first = numString.slice(0, 3) + "-";
        const second = numString.slice(3, 6) + "-"
        const formatted = first + second + numString.slice(6);
        return formatted;
    }

    return (
        <div className="page-hero">
            <div className="page-content">
                <div className="page-title">Shoppping Cart</div>
                <div className="page-subtitle">Order #{`${orderId}`}</div>
                <div id="cart-restaurant-name">{restaurant.name}</div>
                <div id="cart-restaurant-address">{restaurant.address}</div>
                <div id="cart-restaurant-address">{getFormattedNumber(restaurant.restaurantNumber)}</div>
                <button
                    id="add-to-order-button"
                    className="basic-button"
                    onClick={addToOrder}
                >
                    Add to Order
                </button>
                <div id="cart-total-container">
                    <div>Order Total</div>
                    <div>{total}</div>
                </div>
                <table id="cart-product-details-container">
                    <tbody>
                        <tr id="table-header">
                            <th>Product</th>
                            <th>Quantity (#)</th>
                            <th>Item Total</th>
                            <th>Added By</th>
                        </tr>
                        {
                            orderRecords?.map(record => {
                                return <ProductDetail record={record} key={record.id} />
                            })
                        }
                    </tbody>
                </table>
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