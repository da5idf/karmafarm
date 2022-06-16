import React from "react";

import './RestaurantCard.css'
import { getFormattedNumber } from "../../utils"

function RestaurantCard({ restaurant, setFilterId, user }) {

    return (
        <div
            id="restaurant-card"
            className={user?.farmer ? "farmer-card" : ""}
            onClick={() => setFilterId(restaurant.id)}
        >
            <div id="restaurant-card-name">{restaurant.name}</div>
            <div>{getFormattedNumber(restaurant.restaurantNumber)}</div>
            <div>{restaurant.address}</div>
        </div>
    )
}

export default RestaurantCard;