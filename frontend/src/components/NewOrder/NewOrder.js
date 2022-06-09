import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneRestaurant } from "../../store/restaurants";

function NewOrder() {
    const { restaurantId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneRestaurant(restaurantId))
    }, [dispatch])

    return (
        <div className="page-hero">

            <h1>New Order</h1>
        </div>
    )
}

export default NewOrder;