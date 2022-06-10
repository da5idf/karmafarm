import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./OrderProduct.css"
import { addProduct } from "../../store/orders_products"

function OrderProduct({ product, orderId }) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)

    const [quantity, setQuantity] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

    const updateOrder = (e) => {
        setQuantity(e.target.value)
        setSubTotal(e.target.value * product.pricePerPound)
    }

    const addToCart = async (e) => {
        if (quantity === 0) return;

        const newRecord = {
            orderId,
            productId: product.id,
            userId: user.id,
            weight: quantity
        }

        console.log(newRecord)
        dispatch(addProduct(newRecord))

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