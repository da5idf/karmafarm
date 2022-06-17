import React from "react";
import { useHistory } from "react-router-dom";

import "./About.css"

function About({ user }) {
    const history = useHistory();

    if (!user) history.push("/");

    const linkedinLink = "https://www.linkedin.com/in/david-forster-70b44673/";
    const githubLink = "https://github.com/da5idf";

    return (
        <>
            <div id="about-blue" />
            <div id="about-wrapper">
                <div id="about-left">
                    <div id="thankyou-msg-container">
                        <div className="thankyou-message">
                            Thanks for visiting!
                        </div>
                        <div className="thankyou-message">
                            Please get in touch with any questions!
                        </div>

                    </div>
                    <div id="about-dev-links">
                        <div
                            id="github-link"
                            className="dev-link"
                            onClick={() => window.location = githubLink}
                        >
                            <a href={githubLink} >GitHub</a>

                        </div>
                        <div
                            id="linkedin-link"
                            className="dev-link"
                            onClick={() => window.location = linkedinLink}
                        >
                            <a href={linkedinLink} >LinkedIn</a>
                        </div>
                    </div>
                </div>
                <div id="about-photo-container">
                    {/* <img id="about-photo" src={require("../../images/AboutPhoto.jpeg")} alt="" /> */}
                    <div id="about-img-caption">An organic photo from KarmaFarm</div>
                </div>
                <div id="about-right">
                    <div id="about-right-content">
                        <div id="about-farm">
                            <div className="page-subtitle">
                                Last year I worked at an organic farm
                            </div>
                            <div className="about-text">
                                It's a very small farm run with a equally small team. The farm's
                                revenue comes almost exclusively from sales to restaurants. But
                                the ordering system we had was very outdated. The manager more or
                                less did everything by hand. Seeing her frustration sparked the idea
                                for this project! Maybe one day KarmaFarm will use this platform!
                            </div>
                        </div>
                        <div id="about-tech">
                            <div className="page-subtitle">
                                The technologies I used
                            </div>
                            <div id="tech-icons">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" alt="" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" alt="" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" alt="" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* </div> */}
        </>
    )
}

export default About;