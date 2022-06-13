import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getRestaurantOrders } from "../../store/orders"

function OrderCard({ restaurant }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const orders = useSelector(state => state.orders.restaurantOrders);

    console.log(orders)

    useEffect(() => {
        dispatch(getRestaurantOrders(restaurant.id))
    }, [dispatch, restaurant.id])

    return (
        orders.map(order => {
            if (order.id === 4) console.log(order.paid, typeof order.paid)
            return (
                <tr className="order-line-item"
                    onClick={() => history.push(`/orders/${order.id}`)}
                >
                    <td>{order.id}</td>
                    <td>{order.dateOfDelivery}</td>
                    <td>{order.paid === true ? "paid" : "not paid"}</td>
                </tr>
            )
        })
    )
}

export default OrderCard;