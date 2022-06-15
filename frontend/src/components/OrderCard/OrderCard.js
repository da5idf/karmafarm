import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLongPress } from "use-long-press";

import { formatDate, getOrderTotal } from "../../utils"

function OrderCard({ order, farmer, setDeleteOrderId }) {
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
        setDeleteOrderId(order.id);
        const deleteModal = document.getElementById(`${order.id}-delete`)
        console.log(deleteModal);
        deleteModal.style.display = "flex"
        return setRedirect(true);
    }

    const bind = useLongPress(cb, {
        threshold: 750,
        captureEvent: true,
        onStart: () => console.log("start"),
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