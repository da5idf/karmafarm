import React from "react";
import { useHistory } from "react-router-dom"

function Prompt({ props }) {
    const { setStep, handleCancel, newUser, key } = props
    const history = useHistory();

    return (
        <>
            <div id="prompt-buttons">
                <div id="prompt-left">
                    <button
                        className="basic-button"
                        onClick={() => setStep(newUser)}
                    >
                        New Restaurant?
                    </button>
                </div>
                <div id="prompt-right">
                    <button
                        className="basic-button"
                        onClick={() => setStep(key)}
                    >
                        Joining a team?
                    </button>
                </div>
            </div>
            <div
                id="prompt-redirect"
                className="signup-redirect"
                onClick={() => history.push("/login")}
            >
                Already have an account?
            </div>
            <button
                id="prompt-cancel"
                className="bb-wt signup-cancel-button"
                onClick={handleCancel}
            >
                Cancel
            </button>
        </>
    )
}

export default Prompt;