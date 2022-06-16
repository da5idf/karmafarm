import React from "react";

import "./FarmerFeedbackCard.css"

function FarmerFeedbackCard({ feedback }) {
    return (
        <>
            <tr>
                <td>{feedback.Order.id}</td>
                <td>{feedback.Restaurant.name}</td>
                <td>{feedback.Product.name}</td>
            </tr>
            <tr>
                <td colSpan="3" id="feedback-text">{feedback.text}</td>

            </tr>
        </>
        // </div>
    )
}

export default FarmerFeedbackCard;