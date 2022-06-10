import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./OrderProduct.css"
import ProductButtons from "./ProductButtons";
import { addProductToOrder } from "../../store/orders"

function OrderProduct({ product, orderId, orderRecords }) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)

    let productWeight, onThisOrder;
    for (let i = 0; i < orderRecords.length; i++) {
        if (orderRecords[i].productId === product.id) {
            productWeight = orderRecords[i].weight;
            onThisOrder = true;
        }
    }

    const [quantity, setQuantity] = useState(productWeight || 0);
    const [subTotal, setSubTotal] = useState((quantity * product.pricePerPound).toFixed(2));
    const [onOrder, setOnOrder] = useState(onThisOrder);

    const updateOrder = (e) => {
        setQuantity(e.target.value)
        const total = e.target.value * product.pricePerPound;
        setSubTotal(total.toFixed(2))
    }

    const addToCart = () => {
        if (quantity === 0) return;

        const newRecord = {
            orderId,
            productId: product.id,
            userId: user.id,
            weight: quantity
        }

        dispatch(addProductToOrder(newRecord))

    }

    const updateCart = () => {

    }

    const props = {
        onOrder, setOnOrder,
        addToCart
    }

    return (
        <>
            <div id="product-hero">
                <div id="op-product-top">
                    <div id="op-img-container">
                        <img id="op-product-img" src={product.imgUrl} alt="" />
                        <div id="op-product-name">{product.name}</div>
                    </div>
                </div>
                <div id="op-product-bottom">
                    <div id="op-product-description">{product.description}</div>
                    <div id="op-pricing-grid">
                        <div id="op-grid-left">
                            <div id="op-product-ppp">${product.pricePerPound} per pound</div>
                            <div id="input-container">
                                <input
                                    id="op-product-quantity"
                                    value={quantity}
                                    type="number"
                                    onChange={updateOrder}
                                />
                                <div id="input-container-label">pounds</div>
                            </div>
                        </div>
                        <div id="op-grid-right">
                            <div>Item total</div>
                            <div id="op-product-subtotal">{`$${subTotal}`}</div>
                        </div>
                    </div>
                    <ProductButtons props={props} />
                </div>
            </div>
        </>
    )

    return (
        <>
            <div id="product-hero">
                <div id="op-product-name">{product.name}</div>
                <div id="op-product-description">{product.description}</div>
                <div id="op-product-ppp">${product.pricePerPound}</div>
                <input
                    id="op-product-quantity"
                    value={quantity}
                    pattern="\d"
                    onChange={updateOrder}
                />
                <div id="op-product-quantity">{`$${subTotal}`}</div>
                <ProductButtons props={props} />
            </div>
        </>
    )
}

export default OrderProduct;