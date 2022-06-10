import React from "react";

function ProductButtons({ props }) {
    const { onOrder, updateCart, removeFromCart, addToCart } = props

    if (onOrder) {
        return (
            <div id="update-delete-buttons">
                <button
                    id="op-update-cart"
                    onClick={updateCart}
                >
                    Update
                </button>
                <button
                    id="op-remove-item"
                    onClick={removeFromCart}
                >
                    Remove item
                </button>
            </div>
        )
    }

    return (
        <button
            id="op-addtocart"
            onClick={addToCart}
        >
            Add to Cart
        </button>
    )
}

export default ProductButtons;