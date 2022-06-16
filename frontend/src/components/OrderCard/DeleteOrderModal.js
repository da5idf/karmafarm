import React from "react";
import { useDispatch } from "react-redux"
import { deleteWholeOrder } from "../../store/orders";

import "./DeleteOrderModal.css"

function DeleteOrderModal({ orderId, setDeleteOrderId }) {
    const dispatch = useDispatch();

    const cancelDelete = () => {
        setDeleteOrderId(null);
    }

    const confirmDelete = () => {
        dispatch(deleteWholeOrder(orderId));
        setDeleteOrderId(null);
    }

    return (
        <div
            id="delete-order-wrapper"
        >
            <div
                id="order-delete-confirm"
                onClick={confirmDelete}
            >
                Confirm Delete
            </div>
            <div
                id="order-delete-cancel"
                onClick={cancelDelete}
            >
                Cancel
            </div>
        </div>
    )
}

export default DeleteOrderModal;