import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./ProductDetail.css"
import { deleteRecord } from "../../store/orders_products"

function ProductDetail({ record }) {
    const dispatch = useDispatch();

    const product = record.Product;
    const user = record.User;

    const subTotal = record.weight * product.pricePerPound;

    const deleteThisRecord = () => {
        dispatch(deleteRecord(record.id))
    }

    return (
        <div id="product-detail-wrapper">
            <div id="pd-name">{product.name}</div>
            <div id="pd-description">{product.description}</div>
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