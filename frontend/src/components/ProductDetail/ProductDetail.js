import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./ProductDetail.css"
import { deleteRecordFromOrder } from "../../store/orders"

function ProductDetail({ record }) {
    const dispatch = useDispatch();

    const product = record.Product;

    const subTotal = (record.weight * product.pricePerPound).toFixed(2);

    const deleteThisRecord = () => {
        dispatch(deleteRecordFromOrder(record.id))
    }

    return (
        <tr>
            <td id="pd-name">{product.name}</td>
            <td id="pd-weight">{record.weight}</td>
            <td id="pd-subTotal">{`$${subTotal}`}</td>
            <td id="pd-addedBy">{record.User.name}</td>
            <td id="pd-button-update">
                Update
            </td>
            <td id="pd-button-delete"
                onClick={deleteThisRecord}
            >
                Delete
            </td>
        </tr>
    )
}

export default ProductDetail;