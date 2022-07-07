import React from "react";

import SplashPage from "../SplashPage";
import Navigation from "../Navigation";
import Homepage from "../Homepage";
import Chat from "../Chat";

function RootView({ user, isLoaded }) {
    if (user) {
        return (
            <>
                <Navigation isLoaded={isLoaded} />
                <Homepage user={user} />
                <Chat user={user} />
            </>
        )
    } else {
        return (<SplashPage />)
    }
}

export default RootView;