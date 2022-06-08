import React from 'react';
import { useHistory } from 'react-router-dom';

import './SplashPage.css'

function SplashPage() {
    const history = useHistory();

    const loginRedirect = () => {
        history.push('/login')
    }

    const signupRedirect = () => {
        history.push('/signup')
    }

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
                        onClick={loginRedirect}
                    >
                        Login
                    </button>
                    <button
                        className="bb-wt splash-button"
                        onClick={signupRedirect}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;