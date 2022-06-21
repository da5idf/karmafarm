import React from "react";
import { useHistory } from "react-router-dom";

import Navigation from "../Navigation";
import FormBanner from "../FormBanner";
import NewRestaurant from "./NewRestaurant";

function RestaurantSignUp({ user }) {
    const history = useHistory();

    const handleCancel = () => {
        return history.push("/")
    }

    const props = {
        handleCancel
    }

    return (
        <>
            <Navigation />
            <div id="signup-hero">
                <FormBanner />
                <div id="signup-content">
                    <div id="signup-form-title-container">
                        <div id="signup-form-title">Please create a restaurant for your account.</div>
                    </div>
                    <NewRestaurant props={props} />
                </div>
            </div>
        </>
    )

}

export default RestaurantSignUp;