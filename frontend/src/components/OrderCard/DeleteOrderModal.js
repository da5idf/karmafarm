import React from "react";
import { useDispatch } from "react-redux"

import "./DeleteOrderModal.css"

function DeleteOrderModal({ orderId }) {

    const cancelDelete = () => {
        const deleteModal = document.getElementById(`${orderId}-delete`)
        deleteModal.style.display = "none"
    }

    const confirmDelete = () => {

    }

    return (
        <div
            className="delete-order-wrapper delete-order"
            id={`${orderId}-delete`}
        >
            <div
                id={`${orderId}-delete-confirm`}
                className="order-delete-confirm"
                onClick={confirmDelete}
            >
                Confirm Delete
            </div>
            <div
                id={`${orderId}-delete-cancel`}
                className="order-delete-cancel"
                onClick={cancelDelete}
            >
                Cancel
            </div>
        </div>
    )
}

export default DeleteOrderModal;