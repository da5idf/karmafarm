import React, { useState } from "react";


function PasswordToggle({ isPassword, setIsPassword }) {
    const [canView, setCanView] = useState(false);

    const toggle = () => {
        canView ? setCanView(false) : setCanView(true);
        isPassword === "password" ? setIsPassword("text") : setIsPassword("password");
    }

    return (
        <>
            {canView ?
                <img src={require("../../images/hide-password.png")} alt="" className="toggle-password-button" onClick={toggle} />
                :
                <img src={require("../../images/show-password.png")} alt="" className="toggle-password-button" onClick={toggle} />
            }
        </>
    )
}

export default PasswordToggle;