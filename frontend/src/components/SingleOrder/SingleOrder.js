import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SingleOrder.css"
import { toggleSubmission } from "../../store/orders";
import { getFormattedNumber, getOrderTotal } from "../../utils";
import InvoiceItem from "./InvoiceItem";

function SingleOrder({ order }) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)

    const orderId = order.id

    const orderRecords = order.Orders_Products
    const restaurant = order.Restaurant

    // can change this once Farmer can toggle manually
    let delivered = false;
    if (order.dateOfDelivery) {
        const now = new Date().getTime();
        const deliveryDay = new Date(order.dateOfDelivery).getTime();
        delivered = deliveryDay < now;
    }

    const addToOrder = () => {
        dispatch(toggleSubmission(orderId, false))
    }

    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    const deliveryDay = new Date(order.dateOfDelivery).getTime();
    const dueDate = new Date(deliveryDay + twoWeeks).toDateString();

    return (
        <div className="page-hero">
            <div className="page-content">
                <div className="page-title">Order #{`${orderId}`} Invoice</div>
                {!order.delivered && !user.farmer && !delivered && (
                    <button
                        id="add-to-order-button"
                        className="blue-button"
                        onClick={addToOrder}
                        type="button"
                    >
                        Reopen Order
                    </button>
                )}
                <div id="invoice">
                    <div id="invoice-title" className="page-title">INVOICE</div>
                    <div id="invoice-karma-farm-info">
                        <div className="page-subtitle">Karma Farm</div>
                        <div className="invoice-subtitle">16345 Old York Rd</div>
                        <div className="invoice-subtitle">Monkton, MD 21111</div>
                        <div className="invoice-subtitle">(410) 925 - 0962</div>
                    </div>
                    <div id="invoice-banner">
                        <div className="banner-20">
                            <div className="page-subtitle invoice-banner-title">BILL TO</div>
                            <div className="invoice-subtitle invoice-rest-name">{restaurant.name}</div>
                            <div className="invoice-subtitle">{restaurant.address}</div>
                            <div className="invoice-subtitle">{getFormattedNumber(restaurant.restaurantNumber)}</div>
                        </div>
                        <div className="banner-20">
                            <div className="page-subtitle invoice-banner-title">SHIP TO</div>
                            <div className="invoice-subtitle invoice-rest-name">{restaurant.name}</div>
                            <div className="invoice-subtitle">{restaurant.address}</div>
                            <div className="invoice-subtitle">{getFormattedNumber(restaurant.restaurantNumber)}</div>
                        </div>
                        <div id="invoice-banner-right">
                            <div className="space-between">
                                <div className="page-subtitle invoice-banner-title">Invoice #</div>
                                <div>{orderId}</div>
                            </div>
                            <div className="space-between">
                                <div className="page-subtitle invoice-banner-title">Invoice Date</div>
                                <div>{new Date(order.dateOfDelivery).toDateString()}</div>
                            </div>
                            <div className="space-between">
                                <div className="page-subtitle invoice-banner-title">Due Date</div>
                                <div>{dueDate}</div>
                            </div>
                        </div>
                    </div>
                    <table id="invoice-table">
                        <tbody>
                            <tr id="invoice-table-headers">
                                <th className="invoice-table-header">Item</th>
                                <th className="invoice-table-header">Item Name</th>
                                <th className="invoice-table-header">Item Quantity</th>
                                <th className="invoice-table-header">Item Subtotal</th>
                            </tr>

                            {
                                orderRecords.map((record, idx) => {
                                    return <InvoiceItem record={record} idx={idx} order={order} delivered={delivered} key={record.id} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SingleOrder;