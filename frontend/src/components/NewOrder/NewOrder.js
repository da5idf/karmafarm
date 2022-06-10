import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "./NewOrder.css"
import { getAllProducts } from "../../store/products";
import OrderProduct from "../OrderProduct";
import { getOneOrder } from "../../store/orders";

function NewOrder() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { orderId } = useParams();

    const order = useSelector(state => state.orders.thisOrder);
    const restaurant = order.Restaurant

    const productsObjs = useSelector(state => state.products.all);
    const products = Object.values(productsObjs);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getOneOrder(orderId))
            .then(() => dispatch(getAllProducts()))
            .then(() => setIsLoaded(true))
    }, [dispatch, orderId])

    const viewCart = () => {
        history.push(`/orders/${orderId}/cart`)
    }

    if (!isLoaded) {
        return (
            <h1>Loading</h1>
        )
    }

    return (
        <div className="page-hero">
            <div id="new-order-header">
                <div id="new-order-title">New Order for {restaurant?.name}</div>
                <div id="new-order-address">{restaurant?.address}</div>
            </div>
            <div id="products-container">
                <div id="products-title-container">
                    <div id="selection-title">Add items to your cart</div>
                    <button
                        id="cart-button"
                        className="basic-button button"
                        onClick={viewCart}
                    >
                        View Cart
                    </button>
                </div>
                <div id="new-order-product-list">
                    <div id="product-list-headers">
                        <div id="header-name">Product</div>
                        <div id="header-description">Description</div>
                        <div id="header-price">Price pp</div>
                        <div id="header-quantity">Quantity</div>
                        <div id="header-subtotal">Item Total</div>
                    </div>
                    {products.map(product => (<OrderProduct product={product} orderId={order.id} key={product.id} />))}
                </div>
            </div>
        </div >
    )
}

export default NewOrder;