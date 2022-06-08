import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Homepage.css"
import { getRestaurantOrders } from "../../store/orders"

function Homepage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    console.log(user);

    useEffect(() => {
        // dispatch()
    }, [dispatch])



    return (
        <div id="hp-hero">
            <div id="hp-title">Hello {user.name.split(" ")[0]}, welcome back!</div>

            <div id="hp-content">
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