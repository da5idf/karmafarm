import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProductDetail.css"
import { deleteRecordFromOrder, updateRecordOnOrder } from "../../store/orders"

function ProductDetail({ record, order, delivered }) {
    const dispatch = useDispatch();
    const [inUpdate, setInUpdate] = useState(false);
    const [quantity, setQuantity] = useState(record.weight);
    const [newSubTotal, setNewSubTotal] = useState(null);

    const user = useSelector(state => state.session.user);

    const product = record.Product;

    const subTotal = (record.weight * product.pricePerPound).toFixed(2);

    const deleteThisRecord = () => {
        dispatch(deleteRecordFromOrder(record.id))
    }

    const updateThisRecord = () => {
        dispatch(updateRecordOnOrder(record.id, quantity))
        setInUpdate(false)
    }

    const updateQuantity = (e) => {
        setQuantity(e.target.value);
        setNewSubTotal(e.target.value * product.pricePerPound);
    }

    const buttons = inUpdate ?
        (
            <>
                <td id="pd-update-confirm"
                    onClick={updateThisRecord}
                >
                    Confirm
                </td>
                <td id="pd-update-cancel"
                    onClick={() => setInUpdate(false)}
                >
                    Cancel
                </td>
            </>
        ) :
        (
            <>
                <td id="pd-button-update"
                    onClick={() => setInUpdate(true)}
                >
                    Update
                </td>
                <td id="pd-button-delete"
                    onClick={deleteThisRecord}
                >
                    Delete
                </td>
            </>
        )

    return (
        <tr>
            <td id="pd-name">{product.name}</td>
            {inUpdate ?
                <td id="cart-update-quantity-container">
                    <input
                        id="cart-update-quantity"
                        value={quantity}
                        type="number"
                        onChange={updateQuantity}
                    />
                </td>
                :
                <td id="pd-weight">{record.weight}</td>
            }
            <td id="pd-subTotal">{newSubTotal ? `$${newSubTotal}` : `$${subTotal}`}</td>
            <td id="pd-addedBy">{record.User.name}</td>
            {!user.farmer && !delivered && buttons}
        </tr>
    )
}

export default ProductDetail;