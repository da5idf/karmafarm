import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { togglePaymentOnOrder } from "../../store/orders";

import "./TogglePaid.css"

function TogglePaid({ order }) {
    const dispatch = useDispatch();

    const [paid, setPaid] = useState(order.paid || false)

    const handleChange = async () => {
        setPaid(!paid);
        await dispatch(togglePaymentOnOrder(order.id, !paid))
    }

    const subtitle = paid ?
        "This order has been paid." :
        "This order has not been paid."

    const subTitleClass = paid ? "green-text" : "red-text"

    return (
        <div className="payment-toggle">
            <div className="page-subtitle">Toggle payment submission below</div>
            <div id="invoice-toggle-row">
                <div id="invoice-subtitle" className={subTitleClass}>{subtitle}</div>
                <input
                    id="invoice-paid"
                    className="toggle-switch"
                    type="checkbox"
                    checked={paid}
                    onChange={handleChange}
                />
                <label id="invoice-toggle" htmlFor="invoice-paid"></label>
            </div>
        </div>
    )
}

export default TogglePaid;