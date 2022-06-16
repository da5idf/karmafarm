import React from "react";

import "./About.css"

function About() {
    return (
        <>
            <div id="about-blue" />
            {/* <div id="about-green" /> */}
            {/* <img id="about-photo" src={require("../../images/AboutPhoto.jpeg")} /> */}
            {/* <div className="page-hero"> */}
            <div id="about-wrapper">
                <div id="about-left">
                    <div className="thankyou-message">
                        Thanks for visiting!
                    </div>
                    <div className="thankyou-message">
                        Please get in touch with any questions!
                    </div>
                </div>
                <div id="about-photo-container">
                    <img id="about-photo2" src={require("../../images/AboutPhoto.jpeg")} />
                    <div id="about-img-caption">An organic photo from KarmaFarm</div>
                </div>
                <div id="about-right">
                    Hello
                </div>

            </div>
            {/* </div> */}
        </>
    )
}

export default About;