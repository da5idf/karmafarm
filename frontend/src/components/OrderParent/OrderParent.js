import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NewOrder from "../NewOrder"
import Cart from "../Cart"
import SingleOrder from "../SingleOrder"
import { getAllProducts } from "../../store/products";
import { getOneOrder } from "../../store/orders";

function OrderParent() {
    const { orderId } = useParams();
    const dispatch = useDispatch();

    const order = useSelector(state => state.orders.thisOrder);
    const user = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false);
    const [adding, setAdding] = useState(false);

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

    if (user.farmer) {
        return <SingleOrder order={order} />
    }

    if (!order.id) {
        return <h1>Loading</h1>
    }

    if (order.submitted || order.delivered) {
        return <SingleOrder order={order} />
    }
    else if (adding || !order.Orders_Products.length) {
        return <NewOrder order={order} setAdding={setAdding} />
    }
    else if (!adding || order.Orders_Products.length) {
        return <Cart order={order} setAdding={setAdding} />
    }
}

export default OrderParent;