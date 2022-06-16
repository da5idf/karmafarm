import React from "react";

import "./NotFound.css"

function NotFound() {
    return (
        <div id="nf-hero" className="page-hero">
            <div id="nf-page-content" className="page-content">
                <div id="nf-content">
                    <div id="nf-content-left">
                        <div className="page-title">No vegetables here!</div>
                    </div>
                    <button id="nf-button" className="green-button">
                        Go back to dashboard
                    </button>
                </div>
                <div id="nf-img-container">
                    <img id="nf-img" src={require("../../images/notFoundBanner.jpeg")} />

                </div>

            </div>
        </div>
    )
}

export default NotFound;