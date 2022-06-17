import React from "react";

function ProductButtons({ props }) {
    const { onOrder, updateCart, handleRemove, addToCart } = props

    if (onOrder) {
        return (
            <div id="update-delete-buttons">
                <div
                    id="op-update-cart"
                    className="op-button"
                    onClick={updateCart}
                >
                    Update
                </div>
                <div
                    id="op-remove-item"
                    className="op-button"
                    onClick={handleRemove}
                >
                    Remove item
                </div>
            </div>
        )
    }

    return (
        <div
            id="op-addtocart"
            className="op-button"
            onClick={addToCart}
        >
            Add to Cart
        </div>
    )
}

export default ProductButtons;