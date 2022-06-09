import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneRestaurant } from "../../store/restaurants";

function NewOrder() {
    const { restaurantId } = useParams();
    const dispatch = useDispatch();

    const restaurant = useSelector(state => state.restaurants.oneRestaurant)

    useEffect(() => {
        dispatch(getOneRestaurant(restaurantId))
    }, [dispatch])

    return (
        <div className="page-hero">
            <div>
                <div>New Order for {restaurant.name}</div>
            </div>
        </div>
    )
}

export default NewOrder;