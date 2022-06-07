import React from "react";

function Prompt({ props }) {

    const { setStep, handleCancel } = props

    return (
        <>
            <div id="prompt-buttons">
                <div id="prompt-left">
                    <button
                        className="basic-button"
                        onClick={() => setStep(2)}
                    >
                        New Restaurant?
                    </button>
                </div>
                <div id="prompt-right">
                    <button
                        className="basic-button"
                        onClick={() => setStep(3)}
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