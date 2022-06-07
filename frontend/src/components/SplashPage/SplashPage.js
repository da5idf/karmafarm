import React from 'react';

import './SplashPage.css'

function SplashPage() {

    return (
        <div id="splash-hero">
            <div id="splash-img" />

            <div id="splash-content-container">
                <div id="splash-left">
                    <div id="splash-title">Welcome to Karma Farm</div>
                    <div id="splash-search">
                        <div id="splash-slogan" >Good Karma, Great Produce</div>
                    </div>
                </div>

                <div id="splash-right">
                    <button
                        className="basic-button splash-button"
                    >
                        Login
                    </button>
                    <button
                        className="bb-wt splash-button"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;