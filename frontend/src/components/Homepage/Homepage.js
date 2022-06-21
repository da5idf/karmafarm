import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Homepage.css"
import FarmerHomepage from "./FarmerHomepage";
import RestaurantHomepage from "./RestaurantHomepage";
import { getUserRestaurants } from "../../store/users";
import { useState } from "react";

function Homepage({ user }) {
    const dispatch = useDispatch();
    const restaurant = useSelector(state => state.users.restaurant);
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getUserRestaurants(user.id)).then(() => setIsLoaded(true))
    }, [dispatch, user.id])

    if (!isLoaded) {
        return <div>Loading</div>
    }

    if (user.farmer) {
        return <FarmerHomepage user={user} />
    } else if (!restaurant.id) {
        history.push("/restaurant/signup")
    } else {
        return <RestaurantHomepage user={user} />
    }
}

export default Homepage;
