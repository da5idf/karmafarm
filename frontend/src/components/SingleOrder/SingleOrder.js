import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "./SingleOrder.css"
import { getOneOrder } from "../../store/orders";
import ProductDetail from "../ProductDetail";
import { getOrderProducts } from "../../store/orders_products";

function SingleOrder() {
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

    }, [dispatch])

    const addToOrder = () => {
        history.push(`/orders/${orderId}/add`)
    }

    if (!isLoaded) {
        return (
            <h1>Loading</h1>
        )
    }

    return (
        <div className="page-hero">
            <div className="page-title">Order #{`${orderId}`} details</div>
            <div id="so-restaurant-name">{restaurant.name}</div>
            <div id="so-restaurant-address">{restaurant.address}</div>
            <button
                id="add-to-order-button"
                className="basic-button"
                onClick={addToOrder}
            >
                Add to Order
            </button>
            <div id="so-product-details-container">
                {
                    orderRecords?.map(record => {
                        return <ProductDetail record={record} key={record.id} />
                    })
                }
            </div>
        </div>
    )
}

export default SingleOrder;