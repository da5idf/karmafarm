import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleDeliveryOnOrder } from "../../store/orders";

import "./InvoiceToggles.css"

function ToggleDelivered({ order }) {
    const dispatch = useDispatch();

    const [delivered, setDelivered] = useState(order.delivered || false)

    const handleChange = async () => {
        await dispatch(toggleDeliveryOnOrder(order.id, !delivered))
        setDelivered(!delivered);
    }

    const subtitle = delivered ?
        "This order has been delivered." :
        "This order has not been delivered."

    const subTitleClass = delivered ? "green-text" : "red-text"

    return (
        <div className="delivery-toggle">
            <div className="page-subtitle">Toggle delivery status below.</div>
            <div className="invoice-toggle-row">
                <div className={`invoice-subtitle ${subTitleClass} wide-toggle`}>{subtitle}</div>
                <input
                    id="invoice-delivered"
                    className="toggle-switch"
                    type="checkbox"
                    checked={delivered}
                    onChange={handleChange}
                />
                <label id="invoice-toggle" htmlFor="invoice-delivered"></label>
            </div>
        </div>
    )
}

export default ToggleDelivered;