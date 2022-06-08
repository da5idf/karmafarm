import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function NewOrder() {
    const { restaurantId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {

    })

    return (
        <div className="page-hero">

            <h1>New Order</h1>
        </div>
    )
}

export default NewOrder;