import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"

import { getAllRestaurants } from "../../store/restaurants"
import { getAllOrders } from "../../store/orders"
import { copyKey } from "../../utils"
import RestaurantCard from "../RestaurantCard";
import OrderCard from "../OrderCard/OrderCard";

function FarmerHomepage({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const restaurants = useSelector(state => state.restaurants.all);
    const allOrders = useSelector(state => state.orders.all);
    const [filterId, setFilterId] = useState(undefined);

    useEffect(() => {
        dispatch(getAllRestaurants(user.id))
        dispatch(getAllOrders());
    }, [dispatch, user.id])

    const filterOrders = () => {
        const filteredOrders = allOrders.filter(order => {
            if (!filterId) return true
            return order.Restaurant.id === filterId
        })
        return <OrderCard allOrders={filteredOrders} admin={true} />
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
                    onClick={() => history.push("/products/add")}
                >
                    Add Product
                </button>
                <div id="user-restaurants">
                    <div className="page-subtitle">Karma Farm's Restaurants</div>
                    <div id="restaurant-card-container">
                        {
                            restaurants.filter(restaurant => {
                                if (!filterId) return true
                                else return restaurant.id === filterId
                            }).map(restaurant => {
                                return <RestaurantCard restaurant={restaurant} setFilterId={setFilterId} user={user} key={restaurant.id} />
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
                    </div>
                    <div id="hp-content-right">
                        <div id="new-items-container">
                            <div className="page-subtitle">New Items</div>
                        </div>
                        <div id="feedback-container">
                            <div className="page-subtitle">Order Feedback</div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default FarmerHomepage;
