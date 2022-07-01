import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import "./SingleOrder.css"
import { reopenOrder } from "../../store/orders";
import { getFormattedNumber, getOrderTotal } from "../../utils";
import InvoiceItem from "./InvoiceItem";
import TogglePaid from "./TogglePaid";
import ToggleDelivered from "./ToggleDelivered";

function SingleOrder({ order }) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)

    const orderId = order.id

    const orderRecords = order.Orders_Products
    const restaurant = order.Restaurant

    // can change this once Farmer can toggle manually
    // let delivered = false;
    // if (order.dateOfDelivery) {
    //     const now = new Date().getTime();
    //     const deliveryDay = new Date(order.dateOfDelivery).getTime();
    //     delivered = deliveryDay < now;
    // }

    const addToOrder = () => {
        dispatch(reopenOrder(orderId, false, null))
    }

    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    const deliveryDay = new Date(order.dateOfDelivery).getTime();

    const invoiceTitle = order.submitted ? "INVOICE" : "INVOICE -- NOT SUBMITTED";
    const invoiceDate = order.submitted ? new Date(order.dateOfDelivery).toDateString() : "INCOMPLETE ORDER"
    const dueDate = order.submitted ? new Date(deliveryDay + twoWeeks).toDateString() : "INCOMPLETE ORDER"

    const createPDF = () => {
        html2canvas(document.getElementById("inner-invoice"), {
            scale: .9
        })
            .then((canvas) => {
                const pdf = new jsPDF();
                pdf.addImage(canvas.toDataURL("image/png"), "PNG", 15, 15);
                pdf.save(`${order.Restaurant.name}-INVOICE-${order.id}`);

            })
    }

    const farmerToggles = order.submitted && (
        <div id="farmer-toggles">
            <TogglePaid order={order} />
            <ToggleDelivered order={order} />
        </div>
    )

    return (
        <div className="page-hero">
            <div className="page-content">
                <div className="page-title">Order #{`${orderId}`} Invoice</div>
                {!order.delivered && !user.farmer && (
                    <button
                        id="add-to-order-button"
                        className="blue-button"
                        onClick={addToOrder}
                        type="button"
                    >
                        Reopen Order
                    </button>
                )}
                {
                    user.farmer &&
                    <>
                        {farmerToggles}
                        <button
                            id="pdf-button"
                            className="green-button"
                            onClick={createPDF}
                            type="button"
                        >
                            Save as PDF
                        </button>
                    </>
                }
                <div id="invoice">
                    <div id="inner-invoice">
                        <div id="invoice-top">
                            <div id="invoice-title" className="page-title">{invoiceTitle}</div>
                            <div id="invoice-karma-farm-info">
                                <div className="invoice-subtitle bold">Karma Farm</div>
                                <div className="invoice-subtitle">16345 Old York Rd</div>
                                <div className="invoice-subtitle">Monkton, MD 21111</div>
                                <div className="invoice-subtitle">(410) 925 - 0962</div>
                            </div>
                            <div id="invoice-banner">
                                <div className="banner-20">
                                    <div className="page-subtitle invoice-banner-title">BILL TO</div>
                                    <div className="invoice-subtitle bold">{restaurant.name}</div>
                                    <div className="invoice-subtitle">{restaurant.address}</div>
                                    <div className="invoice-subtitle">{getFormattedNumber(restaurant.restaurantNumber)}</div>
                                </div>
                                <div className="banner-20">
                                    <div className="page-subtitle invoice-banner-title">SHIP TO</div>
                                    <div className="invoice-subtitle bold">{restaurant.name}</div>
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
                                        <div>{invoiceDate}</div>
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
                                            return <InvoiceItem record={record} idx={idx} order={order} delivered={order.delivered} key={record.id} />
                                        })
                                    }
                                    <tr>
                                        <td />
                                    </tr>
                                    <tr>
                                        <td />
                                        <td />
                                        <th id="invoice-total-title" >Total</th>
                                        <td id="invoice-total-number">{getOrderTotal(order)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="footer">
                            <div id="signatures">
                                <pre>Received By     ___________________________</pre>
                            </div>
                            <div id="invoice-ty-container">
                                <div id="invoice-thank-you">Thank you!</div>
                                <div id="invoice-thank-you-text">
                                    If anything is wrong with your order, please submit feedback and
                                    we will do everything we can to make it right.
                                </div>
                            </div>
                            <div id="karmafarm-footer">
                                <div id="kf-footer-name">
                                    KarmaFarm
                                </div>
                                <div>
                                    Good Karma Great Produce
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleOrder;