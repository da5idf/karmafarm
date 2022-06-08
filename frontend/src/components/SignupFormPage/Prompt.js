import React from "react";

function Prompt({ props }) {

    const { setStep, handleCancel, newUser, key } = props

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
            <button
                className="bb-wt signup-cancel-button"
                onClick={handleCancel}
            >
                Cancel
            </button>
        </>
    )
}

export default Prompt;