import React from "react";
import { useDispatch } from "react-redux";

import "./SingleOrder.css"
import ProductDetail from "../ProductDetail";
import { toggleSubmission } from "../../store/orders";

function SingleOrder({ props }) {
    const { order, setView, views } = props;
    localStorage.setItem("orderView", views.orderView)

    const orderId = order.id
    const dispatch = useDispatch();

    const orderRecords = order.Orders_Products

    const restaurant = order.Restaurant

    const addToOrder = () => {
        dispatch(toggleSubmission(orderId, false))
        localStorage.setItem("orderView", views.addView)
        setView(views.addView)
    }

    return (
        <div className="page-hero">
            <div className="page-title">Order #{`${orderId}`} details</div>
            <div id="so-restaurant-name">{restaurant.name}</div>
            <div id="so-restaurant-address">{restaurant.address}</div>
            <button
                id="add-to-order-button"
                className="blue-button"
                onClick={addToOrder}
            >
                Add to Order
            </button>
            <div id="so-product-details-container">
                {
                    orderRecords.map(record => {
                        return <ProductDetail record={record} key={record.id} />
                    })
                }
            </div>
        </div>
    )
}

export default SingleOrder;