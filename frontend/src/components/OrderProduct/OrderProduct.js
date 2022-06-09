import React, { useState } from "react";

import "./OrderProduct.css"

function OrderProduct({ product }) {

    const [quantity, setQuantity] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

    const updateOrder = (e) => {
        setQuantity(e.target.value)
        setSubTotal(e.target.value * product.pricePerPound)
    }

    const addToCart = (e) => {
        if (quantity === 0) return;


    }

    return (
        <>
            <div id="product-hero">
                <div id="op-product-name">{product.name}</div>
                <div id="op-product-description">{product.description}</div>
                <div id="op-product-ppp">${product.pricePerPound}</div>
                <input
                    id="op-product-quantity"
                    value={quantity}
                    onChange={updateOrder}
                />
                <div id="op-product-quantity">{`$${subTotal}`}</div>
                <button
                    id="op-addtocart"
                    onClick={addToCart}
                >
                    Add to Cart
                </button>
            </div>
        </>
    )
}

export default OrderProduct;