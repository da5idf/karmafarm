import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./ProductDetail.css"
import { deleteRecordFromOrder } from "../../store/orders"

function ProductDetail({ record }) {
    const dispatch = useDispatch();

    const product = record.Product;

    const subTotal = record.weight * product.pricePerPound;

    const deleteThisRecord = () => {
        dispatch(deleteRecordFromOrder(record.id))
    }

    return (
        <div id="product-detail-wrapper">
            <div id="pd-name">{product.name}</div>
            <div id="pd-weight">{record.weight}</div>
            <div id="pd-subTotal">{`$${subTotal}`}</div>
            <div id="pd-buttons">
                <button
                >
                    Update
                </button>
                <button
                    onClick={deleteThisRecord}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ProductDetail;