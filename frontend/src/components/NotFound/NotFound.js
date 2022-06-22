import React from "react";
import { useHistory } from "react-router-dom";

import "./NotFound.css"

function NotFound() {
    const history = useHistory();

    return (
        <div id="nf-hero" className="page-hero">
            <div id="nf-page-content" className="page-content">
                <div id="nf-content">
                    <div id="nf-content-left">
                        <div className="page-title">No vegetables here!</div>
                    </div>
                    <button
                        id="nf-button"
                        className="green-button"
                        onClick={() => history.push("/")}
                    >
                        Go back to dashboard
                    </button>
                </div>
                <div id="nf-img-container">
                    <img id="nf-img" src={require("../../images/notFoundBanner.jpeg")} alt="" />

                </div>

            </div>
        </div>
    )
}

export default NotFound;