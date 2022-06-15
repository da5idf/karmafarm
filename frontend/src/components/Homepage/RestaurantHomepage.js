import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"

import { getUserRestaurants } from "../../store/users"
import { createOrder } from "../../store/orders"
import { copyKey } from "../../utils"
import RestaurantCard from "../RestaurantCard";
import OrderCard from "../OrderCard/OrderCard";
import { FeedbackForm } from "../Feedback";

function RestaurantHomepage({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const restaurant = useSelector(state => state.users.restaurant)

    useEffect(() => {
        dispatch(getUserRestaurants(user.id))
    }, [dispatch, user.id])

    const newOrder = async () => {
        const order = await dispatch(createOrder(restaurant.id))
        localStorage.setItem("orderView", "add")
        history.push(`/orders/${order.id}`)
    }

    if (!restaurant.id) {
        return <h1>Loading</h1>
    }

    return (
        <div className="page-hero">
            <div className="page-content">
                <div className="page-title">Hello {user?.name.split(" ")[0]}, welcome back!</div>
                {user.admin && (
                    <div id="admin-container" onClick={copyKey}>
                        <div id="admin-text">Admin Key:</div>
                        <div id="admin-key">{user.key}</div>
                        <i className="fa-solid fa-copy"></i>
                    </div>
                )}
                <button
                    className="green-button"
                    id="hp-new-order-button"
                    onClick={newOrder}
                >
                    New Order
                </button>
                <div id="user-restaurants">
                    <div className="page-subtitle">Your Restaurant</div>
                    <div id="restaurant-card-container">
                        {
                            <RestaurantCard restaurant={restaurant} key={restaurant.id} />
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
                                        <th>Order Total</th>
                                        <th className="text-align-center">Paid</th>
                                    </tr>
                                    {
                                        <OrderCard restaurant={restaurant} key={restaurant.id} />
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="hp-content-right">
                        <div id="new-items-container">
                            <div className="page-subtitle">New Items</div>
                        </div>
                        <div id="feedback-container">
                            <FeedbackForm user={user} />
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default RestaurantHomepage;
