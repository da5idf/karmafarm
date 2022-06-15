import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLongPress } from "use-long-press";

import { formatDate, getOrderTotal } from "../../utils"

function OrderCard({ order, farmer, setDeleteOrderId, setError }) {
    const history = useHistory();

    const [redirect, setRedirect] = useState(true);

    const handleClick = () => {
        if (order.submitted) {
            localStorage.setItem("orderView", "order");
        }
        else {
            localStorage.setItem("orderView", "add");
        }
        if (redirect) {
            history.push(`/orders/${order.id}`)
        }
    }

    const cb = () => {
        setRedirect(false);
        setError("");
        setDeleteOrderId(null);

        if (order.dateOfDelivery) {
            const now = new Date().getTime();
            const deliveryDay = new Date(order.dateOfDelivery).getTime();
            const oneDay = 24 * 60 * 60 * 1000
            if (deliveryDay - oneDay <= now) {
                setError("Cannot delete an order within one day of delivery");
                return;
            }
        }
        setDeleteOrderId(order.id);
        return setRedirect(true);
    }

    const bind = useLongPress(cb, {
        threshold: 750,
        captureEvent: true,
        cancelOnMovement: false,
    })

    const children = (
        <>
            <td>{order.id}</td>
            {farmer && <td>{order.Restaurant.name}</td>}
            <td>{formatDate(order.dateOfDelivery)}</td>
            <td id="oc-total">{getOrderTotal(order)}</td>
            <td className="text-align-center">{order.paid === true ? "paid" : "not paid"}</td>
        </>
    )

    if (farmer) {
        return (
            <tr className="order-line-item"
                onClick={handleClick}
                key={new Date().getTime()}
            >
                {children}
            </tr>
        )
    }

    return (
        <tr
            className="order-line-item"
            onClick={handleClick}
            key={new Date().getTime()}
            {...bind()}
        >
            {children}
        </tr>
    )
}

export default OrderCard;