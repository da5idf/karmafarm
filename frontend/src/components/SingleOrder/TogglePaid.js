import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { togglePaymentOnOrder } from "../../store/orders";

import "./InvoiceToggles.css"

function TogglePaid({ order }) {
    const dispatch = useDispatch();

    const [paid, setPaid] = useState(order.paid || false)

    const handleChange = async () => {
        await dispatch(togglePaymentOnOrder(order.id, !paid))
        setPaid(!paid);
    }

    const subtitle = paid ?
        "This order has been paid." :
        "This order has not been paid."

    const subTitleClass = paid ? "green-text" : "red-text"

    return (
        <div className="payment-toggle">
            <div className="page-subtitle">Toggle payment status below</div>
            <div className="invoice-toggle-row">
                <div className={`invoice-subtitle ${subTitleClass}`}>{subtitle}</div>
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