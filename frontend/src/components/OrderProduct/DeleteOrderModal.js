import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteWholeOrder } from "../../store/orders";

function DeleteOrderModal({ setDeleteOrderModal, order, containerClass }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const confirmDelete = () => {
        dispatch(deleteWholeOrder(order.id));
        history.push("/");
    }

    if (order.dateOfDelivery) {
        const now = new Date().getTime();
        const deliveryDay = new Date(order.dateOfDelivery).getTime();
        const oneDay = 24 * 60 * 60 * 1000
        if (deliveryDay - oneDay <= now) {
            setTimeout(() => {
                setDeleteOrderModal(false);
            }, 5000)
            return (
                <div id="delete-order-modal" className={`red-bg ${containerClass}`}>
                    <div id="delete-order-modal-text" className="white-text">
                        You have one item in your cart. Deleting this item
                        will delete your order and orders cannot be deleted
                        within one day of delivery.
                    </div>
                </div>
            )
        }
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