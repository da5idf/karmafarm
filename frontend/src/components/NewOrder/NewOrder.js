import React, { useState } from "react";
import { useSelector } from "react-redux";


import "./NewOrder.css"
import OrderProduct from "../OrderProduct";
import { getOrderTotal } from "../../utils"
import Search from "../Search/Search";

function NewOrder({ props }) {
    const { order, setView, views } = props;
    localStorage.setItem("orderView", views.addView)

    const restaurant = order.Restaurant
    const orderRecords = order.Orders_Products;
    const orderTotal = getOrderTotal(order);

    const productsObjs = useSelector(state => state.products.all);
    let products = Object.values(productsObjs);

    const [filteredProducts, setFilteredProducts] = useState(products);

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
                    <Search items={products} setter={setFilteredProducts} />
                </div>
                <div id="new-order-product-list">
                    {filteredProducts.map(product => (
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