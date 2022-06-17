import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SingleOrder.css"
import ProductDetail from "../ProductDetail";
import { toggleSubmission } from "../../store/orders";

function SingleOrder({ order }) {

    const user = useSelector(state => state.session.user)

    const orderId = order.id
    const dispatch = useDispatch();

    const orderRecords = order.Orders_Products
    const restaurant = order.Restaurant

    let delivered = false;
    if (order.dateOfDelivery) {
        const now = new Date().getTime();
        const deliveryDay = new Date(order.dateOfDelivery).getTime();
        delivered = deliveryDay < now;
    }

    const addToOrder = () => {
        dispatch(toggleSubmission(orderId, false))
    }

    return (
        <div className="page-hero">
            <div className="page-title">Order #{`${orderId}`} details</div>
            <div id="so-restaurant-name">{restaurant.name}</div>
            <div id="so-restaurant-address">{restaurant.address}</div>
            {!order.delivered && !user.farmer && !delivered && (
                <button
                    id="add-to-order-button"
                    className="blue-button"
                    onClick={addToOrder}
                >
                    Add to Order
                </button>
            )}
            <div id="so-product-details-container">
                {
                    orderRecords.map(record => {
                        return <ProductDetail record={record} order={order} delivered={delivered} key={record.id} />
                    })
                }
            </div>
        </div>
    )
}

export default SingleOrder;