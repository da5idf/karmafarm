import React, { useState } from "react";
import { useSelector } from "react-redux";


import "./NewOrder.css"
import OrderProduct from "../OrderProduct";
import { getOrderTotal } from "../../utils"
import Search from "../Search/Search";

function NewOrder({ order, setAdding }) {

    const restaurant = order.Restaurant
    const orderRecords = order.Orders_Products;
    const orderTotal = getOrderTotal(order);

    const productsObjs = useSelector(state => state.products.all);
    let products = Object.values(productsObjs);

    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const viewCart = () => {
        if (!orderRecords.length) {
            setError("Add at least 1 item to view cart")
        }
        setAdding(false);
    }

    return (
        <div className="page-hero">
            <div className="page-content">
                <div id="new-order-header">
                    <div id="new-order-title">Order for {restaurant?.name}</div>
                    <div id="new-order-address">{restaurant?.address}</div>
                </div>
                <div id="products-title-container">
                    <div className="selection-title">Add items to your cart</div>
                    <div id="products-title-right">
                        <div id="cart-order-total-container">
                            <div className="selection-title">Order Total</div>
                            <div id="no-cart-total">{orderTotal}</div>
                        </div>
                        <button
                            id="cart-button"
                            className="basic-button button"
                            onClick={viewCart}
                        >
                            View Cart
                        </button>
                    </div>
                </div>
                <div id="filter-search-container">
                    <Search query={query} setter={setQuery} />
                    <div id="cart-icons-container">
                        {error && <div className="err-text">{error}</div>}
                        <i id="new-order-cart" className="fa-solid fa-basket-shopping"></i>
                        <div id="cart-items-num">
                            <div>{orderRecords.length}</div>
                        </div>
                    </div>
                </div>
                <div id="new-order-product-list">
                    {products.filter(product => {
                        if (!query) return true;
                        else return product.name.toLowerCase().includes(query.toLowerCase())
                    }).map(product => (
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