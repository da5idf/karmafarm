import React from "react";

import './RestaurantCard.css'
import { getFormattedNumber } from "../../utils"

function RestaurantCard({ restaurant, setFilterId }) {

    return (
        <div id="restaurant-card"
            onClick={() => {
                console.log(restaurant.id);
                setFilterId(restaurant.id)
            }}
        >
            <div id="restaurant-card-name">{restaurant.name}</div>
            <div>{getFormattedNumber(restaurant.restaurantNumber)}</div>
            <div>{restaurant.address}</div>
        </div>
    )
}

export default RestaurantCard;