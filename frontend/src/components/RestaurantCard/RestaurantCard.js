import React from "react";

import './RestaurantCard.css'
import { getFormattedNumber } from "../../utils"

function RestaurantCard({ restaurant }) {

    return (
        <div id="restaurant-card">
            <div id="restaurant-card-name">{restaurant.name}</div>
            <div>{getFormattedNumber(restaurant.restaurantNumber)}</div>
            <div>{restaurant.address}</div>
        </div>
    )
}

export default RestaurantCard;