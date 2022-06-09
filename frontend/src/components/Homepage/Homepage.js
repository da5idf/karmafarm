import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"

import "./Homepage.css"
import { getUserRestaurants } from "../../store/users"
import { getRestaurantOrders } from "../../store/orders"

function Homepage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(getUserRestaurants(user.id))
    }, [dispatch])



    return (
        <div className="page-hero">
            <div id="hp-title">Hello {user.name.split(" ")[0]}, welcome back!</div>

            <div id="hp-content">
                <button
                    className="basic-button"
                    id="hp-new-order-button"
                    onClick={() => history.push(`restaurants/1/orders/new`)}
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
