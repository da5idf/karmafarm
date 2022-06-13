import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";

import "./Cart.css"
import ProductDetail from "../ProductDetail";
import { toggleSubmission, updateDeliveryOnOrder } from "../../store/orders"
import { getFormattedNumber, getOrderTotal } from '../../utils'

function Cart({ props }) {
    const { order, setView, views } = props;
    localStorage.setItem("orderView", views.cartView)

    const [deliveryDay, setDeliveryDay] = useState(new Date(order.dateOfDelivery))
    const [error, setError] = useState("")

    const orderId = order.id
    const dispatch = useDispatch();

    const orderRecords = order.Orders_Products
    const total = getOrderTotal(order);
    const restaurant = order.Restaurant

    const addToOrder = () => {
        localStorage.setItem("orderView", views.addView)
        setView(views.addView)
    }

    const submitOrder = () => {
        if (validateDeliveryDay()) {
            dispatch(toggleSubmission(orderId, true));
            dispatch(updateDeliveryOnOrder(orderId, deliveryDay))
            localStorage.setItem("orderView", views.orderView)
            setView(views.orderView)
        }
    }

    const validateDeliveryDay = () => {
        setError("");
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

        if (deliveryDay <= today || deliveryDay > nextWeek) {
            setError("Please pick a day in the future, within one week")
            return false;
        }
        else {
            return true;
        }
    }

    return (
        <div className="page-hero">
            <div className="page-content">
                <div className="page-title">Shoppping Cart</div>
                <div className="page-subtitle">Order #{`${orderId}`}</div>
                <div id="cart-restaurant-name">{restaurant.name}</div>
                <div id="cart-restaurant-address">{restaurant.address}</div>
                <div id="cart-restaurant-number">{getFormattedNumber(restaurant.restaurantNumber)}</div>
                <div id="cart-top-wrapper">
                    <div id="calendar-container">
                        <div className="page-subtitle" id="dd-title">Select your delivery day</div>
                        <Calendar
                            onChange={setDeliveryDay}
                            value={deliveryDay}
                            prev2Label={null}
                            next2Label={null}
                            activeStartDate={new Date()}
                            tileDisabled={({ date }) => date < new Date()}
                        />
                    </div>
                    <div id="top-wrapper-right">
                        <div id="error-container">
                            <div id="error-msg">{error}</div>
                        </div>
                        <div id="cart-total-container">
                            <div className="page-subtitle">Order Total</div>
                            <div id="cart-total">{total}</div>
                        </div>
                        <div id="wrapper-button-container">
                            <button
                                id="add-to-order-button"
                                className="basic-button"
                                onClick={addToOrder}
                            >
                                Add to Order
                            </button>
                            <button
                                id="cart-submit-button"
                                className="blue-button"
                                onClick={submitOrder}
                            >
                                Submit Order
                            </button>

                        </div>
                    </div>

                </div>
                <div id="cart-table-icon">
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
                    <i className="fa-solid fa-basket-shopping" id="cart-icon"></i>
                </div>
            </div>
        </div>
    )
}

export default Cart;