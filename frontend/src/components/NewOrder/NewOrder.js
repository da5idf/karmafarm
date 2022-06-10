import React from "react";
import { useSelector } from "react-redux";


import "./NewOrder.css"
import OrderProduct from "../OrderProduct";

function NewOrder({ props }) {
    const { order, setView, views } = props;
    localStorage.setItem("orderView", views.addView)

    const restaurant = order.Restaurant

    const productsObjs = useSelector(state => state.products.all);
    const products = Object.values(productsObjs);


    const viewCart = () => {
        setView(views.cartView);
        localStorage.setItem("orderView", views.cartView)
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