import React from "react";

import SplashPage from "../SplashPage";
import Navigation from "../Navigation";
import Homepage from "../Homepage";

function RootView({ user, isLoaded }) {
    if (user) {
        return (
            <>
                <Navigation isLoaded={isLoaded} />
                <Homepage />
            </>
        )
    } else {
        return (<SplashPage />)
    }
}

export default RootView;