import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./NewOrder.css"
import { getAllProducts } from "../../store/products";
import { getOneRestaurant } from "../../store/restaurants";
import OrderProduct from "../OrderProduct";

function NewOrder() {
    const { restaurantId } = useParams();
    const dispatch = useDispatch();

    const restaurant = useSelector(state => state.restaurants.one);
    const productsObjs = useSelector(state => state.products.all);
    const products = Object.values(productsObjs);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getOneRestaurant(restaurantId));
        dispatch(getAllProducts())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div className="page-hero">
            <div id="new-order-header">
                <div id="new-order-title">New Order for {restaurant.name}</div>
            </div>
            <div id="products-container">
                <div id="selection-title">Add items to your cart</div>
                <div id="new-order-product-list">
                    <div id="product-list-headers">
                        <div id="header-name">Product</div>
                        <div id="header-description">Description</div>
                        <div id="header-price">Price pp</div>
                        <div id="header-quantity">Quantity</div>
                        <div id="header-subtotal">Item Total</div>
                    </div>
                    {products.map(product => (<OrderProduct product={product} key={product.id} />))}
                </div>
            </div>
        </div >
    )
}

export default NewOrder;