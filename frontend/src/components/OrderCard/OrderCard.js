import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLongPress } from "use-long-press";
import { v4 as uuidv4 } from 'uuid';

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

    const now = new Date().getTime();
    const deliveryDay = new Date(order.dateOfDelivery).getTime();
    const oneDay = 24 * 60 * 60 * 1000

    const cb = () => {
        setRedirect(false);
        setError("");
        setDeleteOrderId(null);

        const clearError = () => setError("")

        if (order.dateOfDelivery) {
            if (deliveryDay < now) {
                setTimeout(clearError, 2500)
                setError("Cannot delete orders that have been delivered.")
                return;
            }
            else if (deliveryDay - oneDay <= now) {
                setTimeout(clearError, 2500)
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

    const greenText = (order.submitted && order.delivered) ? "green-text" : ""

    const children = (
        <>
            <td>{order.id}</td>
            {farmer && <td>{order.Restaurant.name}</td>}
            <td className={greenText}>{formatDate(order.dateOfDelivery) || "Not Submitted"}</td>
            <td id="oc-total">{getOrderTotal(order)}</td>
            <td className="text-align-center">{order.paid === true ? "paid" : "not paid"}</td>
        </>
    )

    if (farmer) {
        return (
            <tr className="order-line-item"
                onClick={handleClick}
                key={uuidv4()}
            >
                {children}
            </tr>
        )
    }

    return (
        <tr
            className="order-line-item"
            onClick={handleClick}
            key={uuidv4()}
            {...bind()}
        >
            {children}
        </tr>
    )
}

export default OrderCard;