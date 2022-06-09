import React from "react";
import { useHistory } from "react-router-dom";

import './FormBanner.css'

function FormBanner() {
    const history = useHistory();

    return (
        <div id="form-banner-hero" onClick={() => history.push("/")}>
            <div id="form-banner-karma">Karma</div>
            <div id="form-banner-farm">Farm</div>
        </div>
    )
}

export default FormBanner;