import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getRestaurantOrders } from "../../store/orders"
import { formatDate, getOrderTotal } from "../../utils"

function OrderCard({ restaurant }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const orders = useSelector(state => state.orders.restaurantOrders);

    useEffect(() => {
        dispatch(getRestaurantOrders(restaurant.id))
    }, [dispatch, restaurant.id])

    return (
        orders.map(order => {
            return (
                <tr className="order-line-item"
                    onClick={() => history.push(`/orders/${order.id}`)}
                    key={order.id}
                >
                    <td>{order.id}</td>
                    <td>{formatDate(order.dateOfDelivery)}</td>
                    <td id="oc-total">{getOrderTotal(order)}</td>
                    <td className="text-align-center">{order.paid === true ? "paid" : "not paid"}</td>
                </tr>
            )
        })
    )
}

export default OrderCard;