import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"

import "./Homepage.css"
import { getUserRestaurants } from "../../store/users"
import { createOrder } from "../../store/orders"
import RestaurantCard from "../RestaurantCard";
import OrderCard from "../OrderCard/OrderCard";

function Homepage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const restaurants = useSelector(state => state.users.restaurants)

    useEffect(() => {
        dispatch(getUserRestaurants(user.id))
    }, [dispatch, user.id])

    const newOrder = async () => {
        const order = await dispatch(createOrder(restaurants[0]?.id))
        localStorage.setItem("orderView", "add")
        history.push(`/orders/${order.id}`)
    }

    if (!restaurants) {
        return <h1>Loading</h1>
    }

    return (
        <div className="page-hero">
            <div className="page-content">
                <div className="page-title">Hello {user?.name.split(" ")[0]}, welcome back!</div>
                {user.admin && (
                    <div id="admin-container">
                        <div id="admin-text">Admin Key:</div>
                        <div id="admin-key">{user.key}</div>
                    </div>
                )}
                <button
                    className="basic-button"
                    id="hp-new-order-button"
                    onClick={newOrder}
                >
                    New Order
                </button>
                <div id="user-restaurants">
                    <div className="page-subtitle">Your Restaurant</div>
                    <div id="restaurant-card-container">
                        {
                            restaurants.map(restaurant => {
                                return <RestaurantCard restaurant={restaurant} key={restaurant.id} />
                            })
                        }
                    </div>
                </div>
                <div id="hp-content">
                    <div id="hp-content-left">
                        <div id="hp-orders-container">
                            <div className="page-subtitle">Your Orders</div>
                            <table id="hp-orders-table">
                                <tbody>
                                    <tr id="orders-table-header">
                                        <th>Order Number</th>
                                        <th>Delivery Date</th>
                                        <th>Paid</th>
                                    </tr>
                                    {
                                        restaurants.map(restaurant => {
                                            return <OrderCard restaurant={restaurant} key={restaurant.id} />
                                        })
                                    }
                                </tbody>
                            </table>
                            <div id="hp-orders">
                            </div>
                        </div>
                    </div>
                    <div id="hp-content-right">
                        <div className="page-subtitle">New Items</div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Homepage;
