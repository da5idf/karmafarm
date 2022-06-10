import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NewOrder from "../NewOrder"
import Cart from "../Cart"
import SingleOrder from "../SingleOrder"
import { getAllProducts } from "../../store/products";
import { getOneOrder } from "../../store/orders";

function OrderParent() {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const order = useSelector(state => state.orders.thisOrder);

    const [isLoaded, setIsLoaded] = useState(false);
    const [view, setView] = useState(localStorage.getItem("orderView"));

    const addView = "add";
    const cartView = "cart";
    const orderView = "order";

    useEffect(() => {
        dispatch(getOneOrder(orderId))
            .then(() => dispatch(getAllProducts()))
            .then(() => setIsLoaded(true))
    }, [dispatch, orderId])


    if (!isLoaded) {
        return (
            <h1>Loading</h1>
        )
    }

    const props = {
        order,
        setView,
        views: {
            addView,
            cartView,
            orderView,
        }
    }

    switch (view) {
        case addView:
            return <NewOrder props={props} />
        case cartView:
            return <Cart props={props} />
        case orderView:
            return <SingleOrder props={props} />
        default:
            return history.push("/");
    }

}

export default OrderParent;