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
        <tr>
            <td id="pd-name">{product.name}</td>
            <td id="pd-weight">{record.weight}</td>
            <td id="pd-subTotal">{`$${subTotal}`}</td>
            <td id="pd-buttons">
                <button
                >
                    Update
                </button>
            </td>
            <td>
                <button
                    onClick={deleteThisRecord}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default ProductDetail;