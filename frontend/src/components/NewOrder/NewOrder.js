import React from "react";
import { useSelector } from "react-redux";


import "./NewOrder.css"
import OrderProduct from "../OrderProduct";

function NewOrder({ props }) {
    const { order, setView, views } = props;
    localStorage.setItem("orderView", views.addView)

    const restaurant = order.Restaurant
    const orderRecords = order.Orders_Products;

    const productsObjs = useSelector(state => state.products.all);
    const products = Object.values(productsObjs);


    const viewCart = () => {
        setView(views.cartView);
        localStorage.setItem("orderView", views.cartView)
    }

    return (
        <div className="page-hero">
            <div className="page-content">
                <div id="new-order-header">
                    <div id="new-order-title">Order for {restaurant?.name}</div>
                    <div id="new-order-address">{restaurant?.address}</div>
                </div>
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
                    {products.map(product => (
                        <OrderProduct
                            product={product}
                            orderId={order.id}
                            orderRecords={orderRecords}
                            key={product.id}
                        />
                    ))}
                </div>
            </div>
        </div >
    )
}

export default NewOrder;