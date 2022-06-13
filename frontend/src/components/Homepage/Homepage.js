import React from "react";

import "./Homepage.css"
import FarmerHomepage from "./FarmerHomepage";
import RestaurantHomepage from "./RestaurantHomepage";

function Homepage({ user }) {
    if (user.farmer) {
        return <FarmerHomepage user={user} />
    } else {
        return <RestaurantHomepage user={user} />
    }
}

export default Homepage;
