import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteWholeOrder } from "../../store/orders";

function DeleteOrderModal({ setDeleteOrderModal, orderId, containerClass }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const confirmDelete = () => {
        dispatch(deleteWholeOrder(orderId));
        history.push("/");
    }

    return (
        <div id="delete-order-modal" className={`red-bg ${containerClass}`}>
            <div id="delete-order-modal-text" className="white-text">
                You have one item in your cart. Deleting this item
                will delete your order.
            </div>
            <div className="flex-col-center" style={{ width: "100%" }}>
                <button
                    id="cart-delete-order"
                    className="green-button"
                    onClick={confirmDelete}
                >
                    Confirm
                </button>
                <button
                    id="cart-cancel-delete"
                    className="yellow-button white-text"
                    onClick={() => setDeleteOrderModal(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default DeleteOrderModal;