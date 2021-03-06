import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid';

import { getUserRestaurants } from "../../store/users"
import { createOrder, getRestaurantOrders } from "../../store/orders"
import { copyKey } from "../../utils"
import RestaurantCard from "../RestaurantCard";
import OrderCard from "../OrderCard/OrderCard";
import { FeedbackForm } from "../Feedback";
import DeleteOrderModal from "../OrderCard/DeleteOrderModal";
import Weather from "../Weather";
import { UpdateMessageModal } from "../UpdateMessage";

function RestaurantHomepage({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const restaurant = useSelector(state => state.users.restaurant);
    const ordersObjs = useSelector(state => state.orders.restaurantOrders);
    const orders = Object.values(ordersObjs);

    const [deleteOrderId, setDeleteOrderId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        dispatch(getUserRestaurants(user.id))
            .then((restaurant) => {
                dispatch(getRestaurantOrders(restaurant.id))
            })
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
        <>
            <UpdateMessageModal user={user} />
            <div className="page-hero">
                <div className="page-content">
                    <div className="page-title">Hello {user?.name.split(" ")[0]}, welcome back!</div>
                    <div id="hp-top">
                        <div id="hp-top-left">
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
                                        <RestaurantCard restaurant={restaurant} key={uuidv4()} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div id="hp-top-right">
                            <Weather />
                        </div>
                    </div>
                    <div id="hp-content">
                        <div id="hp-content-left">
                            <div id="hp-orders-container">
                                <div id="order-list-title_modal">
                                    <div className="page-subtitle">Your Orders</div>
                                    {!deleteOrderId && !error && <div>Click and hold to delete an order</div>}
                                    {deleteOrderId && <DeleteOrderModal orderId={deleteOrderId} setDeleteOrderId={setDeleteOrderId} />}
                                    {error && <div id="delete-window-error">{error}</div>}
                                </div>
                                <table id="hp-orders-table">
                                    <tbody>
                                        <tr id="orders-table-header">
                                            <th>Order Number</th>
                                            <th>Delivery Date</th>
                                            <th>Order Total</th>
                                            <th className="text-align-center">Paid</th>
                                            <th></th>
                                        </tr>
                                        {
                                            orders.map(order => (
                                                <OrderCard order={order} setDeleteOrderId={setDeleteOrderId} setError={setError} key={uuidv4()} />
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="green-text">Green denotes a delivered order</div>
                        </div>
                        <div id="hp-content-right">
                            <div id="feedback-container">
                                <FeedbackForm user={user} orders={orders} />
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default RestaurantHomepage;
