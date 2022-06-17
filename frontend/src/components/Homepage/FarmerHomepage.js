import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

import { getAllRestaurants } from "../../store/restaurants"
import { getAllOrders } from "../../store/orders"
import { copyKey } from "../../utils"
import RestaurantCard from "../RestaurantCard";
import OrderCard from "../OrderCard/OrderCard";
import { getFeedback } from "../../store/feedback";
import { FarmerFeedbackCard } from "../Feedback"

function FarmerHomepage({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const restaurants = useSelector(state => state.restaurants.all);
    const allOrders = useSelector(state => state.orders.all);
    const allFeedback = useSelector(state => state.feedback)
    const [filterId, setFilterId] = useState(undefined);

    useEffect(() => {
        dispatch(getAllRestaurants(user.id))
        dispatch(getAllOrders());
        dispatch(getFeedback());
    }, [dispatch, user.id])

    const filterOrders = () => {
        return allOrders.filter(order => {
            if (!filterId) return true
            return order.Restaurant.id === filterId
        }).map(order => {
            return <OrderCard order={order} farmer={true} />
        })
    }

    if (!restaurants) {
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
                    onClick={() => history.push("/products")}
                >
                    Add and Edit Products
                </button>
                <div id="user-restaurants">
                    <div className="page-subtitle">Karma Farm's Restaurants</div>
                    <div id="restaurant-card-container">
                        {
                            restaurants.filter(restaurant => {
                                if (!filterId) return true
                                else return restaurant.id === filterId
                            }).map(restaurant => {
                                return <RestaurantCard restaurant={restaurant} setFilterId={setFilterId} user={user} key={uuidv4()} />
                            })
                        }
                        {filterId && (
                            <button id="clear-filter"
                                className="basic-button"
                                onClick={() => setFilterId(undefined)}
                            >
                                Clear Filter
                            </button>
                        )}
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
                                        <th>Restaurant</th>
                                        <th>Delivery Date</th>
                                        <th>Order Total</th>
                                        <th className="text-align-center">Paid</th>
                                    </tr>
                                    {
                                        filterOrders()
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="green-text">Green denotes a delivered order</div>
                    </div>
                    <div id="hp-content-right">
                        <div className="page-subtitle">Order Feedback</div>
                        <div id="feedback-container">
                            <table id="feedback-hero">
                                <tbody>
                                    <tr>
                                        <th>Order #</th>
                                        <th>Restaurant</th>
                                        <th>Product</th>
                                    </tr>
                                    {
                                        allFeedback.filter(feedback => {
                                            if (!filterId) return true
                                            return feedback.Restaurant.id === filterId
                                        }).map(feedback => {
                                            return <FarmerFeedbackCard feedback={feedback} />
                                        })
                                    }
                                </tbody>

                            </table>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default FarmerHomepage;
