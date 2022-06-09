import React from "react";

import './CartModal.css'

function CartModal({ product, setModal }) {
    return (
        <div id="cart-modal">
            <div id="cart-modal-content">
                <button onClick={() => setModal(false)}>X</button>
                Hello
            </div>
        </div>
    )

}

export default CartModal;