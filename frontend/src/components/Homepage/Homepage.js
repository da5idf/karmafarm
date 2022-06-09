import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"

import "./Homepage.css"
import { getUserRestaurants } from "../../store/users"
import { createOrder, getRestaurantOrders } from "../../store/orders"

function Homepage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const restaurants = useSelector(state => state.users.restaurants)

    useEffect(() => {
        dispatch(getUserRestaurants(user?.id))
    }, [dispatch])

    console.log()

    const newOrder = async () => {
        const order = await dispatch(createOrder(restaurants[0]?.id))
        history.push(`/orders/${order.id}/add`)
    }

    return (
        <div className="page-hero">
            <div id="hp-title">Hello {user?.name.split(" ")[0]}, welcome back!</div>

            <div id="hp-content">
                <button
                    className="basic-button"
                    id="hp-new-order-button"
                    onClick={newOrder}
                >
                    New Order
                </button>
                <div id="hp-orders-container">
                    <div id="hp-orders-title">Orders</div>
                    <div id="hp-orders">

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Homepage;
