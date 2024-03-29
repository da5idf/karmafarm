import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";

import "./Cart.css"
import ProductDetail from "../ProductDetail";
import { toggleSubmission, updateDeliveryOnOrder } from "../../store/orders"
import { getFormattedNumber, getOrderTotal } from '../../utils'
import DeleteOrderModal from "../OrderProduct/DeleteOrderModal";

function Cart({ order, setAdding }) {

    const [deliveryDay, setDeliveryDay] = useState(new Date(order.dateOfDelivery))
    const [dateError, setDateError] = useState("")
    const [nullError, setNullError] = useState("")
    const [updateError, setUpdateError] = useState("")
    const [deleteOrderModal, setDeleteOrderModal] = useState(false);

    const orderId = order.id
    const dispatch = useDispatch();

    const orderRecords = order.Orders_Products
    const total = getOrderTotal(order);
    const restaurant = order.Restaurant

    const addToOrder = () => {
        setAdding(true)
    }

    const submitOrder = async () => {
        const nullOrder = validateNullOrder();
        const validDelivery = validateDeliveryDay();

        if (!nullOrder || !validDelivery) return
        setAdding(false);
        await dispatch(toggleSubmission(orderId, true));
        dispatch(updateDeliveryOnOrder(orderId, deliveryDay))
    }

    const validateNullOrder = () => {
        setNullError("")
        if (orderRecords.length === 0) {
            setNullError("Orders must have at least 1 item")
            return false
        }
        return true;
    }

    const validateDeliveryDay = () => {
        setDateError("");
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

        if (deliveryDay <= today || deliveryDay > nextWeek) {
            setDateError("Please pick a day in the future, within one week")
            return false;
        }
        return true;
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
                            view="month"
                            onChange={setDeliveryDay}
                            showFixedNumberOfWeeks={true}
                            value={deliveryDay}
                            prev2Label={null}
                            next2Label={null}
                            activeStartDate={new Date()}
                            tileDisabled={({ date }) => date < new Date() || date > new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)}
                            onViewChange={({ action, activeStartDate, value, view }) => alert('Changed view to: ', activeStartDate, view, action, value)}
                        />
                    </div>
                    <div id="top-wrapper-right">
                        <div id="error-container">
                            <div className="error-msg">{dateError}</div>
                            <div className="error-msg">{nullError}</div>
                            <div className="error-msg">{updateError}</div>
                            {deleteOrderModal && (
                                <DeleteOrderModal
                                    setDeleteOrderModal={setDeleteOrderModal}
                                    containerClass="flex-modal"
                                    order={order}
                                />
                            )

                            }
                        </div>
                        <div id="cart-totals-info">
                            <div className="cart-totals-row">
                                <div className="page-subtitle">Item Count</div>
                                <div id="cart-total">{orderRecords.length}</div>
                            </div>
                            <div className="cart-totals-row">
                                <div className="page-subtitle">Order Total</div>
                                <div id="cart-total">{total}</div>
                            </div>
                        </div>
                        <div id="wrapper-button-container">
                            <button
                                id="add-to-order-button"
                                className="basic-button"
                                onClick={addToOrder}
                                type="button"
                            >
                                Add to Order
                            </button>
                            <button
                                id="cart-submit-button"
                                className="blue-button"
                                onClick={submitOrder}
                                type="button"
                            >
                                Submit Order
                            </button>

                        </div>
                    </div>

                </div>
                <div id="cart-table-icon">
                    <table id="cart-table">
                        <tbody>
                            <tr id="table-header">
                                <th>Product</th>
                                <th>Quantity (#)</th>
                                <th>Item Total</th>
                                <th>Added By</th>
                            </tr>
                            {
                                orderRecords?.map(record => {
                                    return (
                                        <ProductDetail
                                            record={record}
                                            order={order}
                                            setDeleteOrderModal={setDeleteOrderModal}
                                            setUpdateError={setUpdateError}
                                            key={record.id} />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Cart;