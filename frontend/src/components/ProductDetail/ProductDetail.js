import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProductDetail.css"
import { deleteRecordFromOrder, updateRecordOnOrder } from "../../store/orders"

function ProductDetail({ record, order, setDeleteOrderModal, delivered, setUpdateError }) {
    const dispatch = useDispatch();
    const [inUpdate, setInUpdate] = useState(false);
    const [quantity, setQuantity] = useState(record.weight);
    const [newSubTotal, setNewSubTotal] = useState(null);

    const user = useSelector(state => state.session.user);

    const product = record.Product;
    const subTotal = (record.weight * product.pricePerPound).toFixed(2);

    const handleDelete = () => {
        if (validateDelete()) deleteThisRecord();
    }

    const validateDelete = () => {
        if (order.Orders_Products.length > 1) return true;

        setDeleteOrderModal(true);
        return false;
    }

    const deleteThisRecord = () => {
        dispatch(deleteRecordFromOrder(record.id))
    }

    const updateThisRecord = () => {
        if (!validQuantity(quantity)) return;
        dispatch(updateRecordOnOrder(record.id, quantity))
        setInUpdate(false)
    }

    // see if you can clean up
    // same functions as in OrderProdcut & AddProductForm
    const updateQuantity = (e) => {
        setUpdateError("")

        setQuantity(e.target.value)
        const value = e.target.value

        if (!validQuantity(value)) {
            if (value > 200 || value < 0) {
                setQuantity(value.toString().slice(0, 6))
                e.target.style.color = "red"
                setNewSubTotal("Invalid")
                return;
            }
        }

        e.target.style.color = "black"
        const total = value * product.pricePerPound;
        setNewSubTotal(total.toFixed(2))
    }

    const validQuantity = (value) => {
        if (!value || value <= 0) {
            setUpdateError("Quantity must be > 0")
            return false;
        }
        if (value > 200) {
            setUpdateError("200# max on order")
            return false;
        }
        const valStr = value.toString();
        const decimals = valStr.split(".")[1];
        if (decimals && decimals.length > 2) {
            setQuantity(valStr.slice(0, valStr.length - 1))
            setUpdateError("2 decimals max");
            return false;
        }

        return true
    }

    const handleCancel = () => {
        setUpdateError("");
        setQuantity(record.weight);
        setInUpdate(false);
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
                    onClick={handleCancel}
                >
                    Cancel
                </td>
            </>
        ) :
        (
            <>
                <td id="pd-button-update"
                    onClick={() => {
                        setDeleteOrderModal(false);
                        setInUpdate(true);
                    }}
                >
                    Update
                </td>
                <td id="pd-button-delete"
                    onClick={handleDelete}
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
            <td id="pd-subTotal">{newSubTotal === "invalid" ? newSubTotal : `$${subTotal}`}</td>
            <td id="pd-addedBy">{record.User.name}</td>
            {!user.farmer && !delivered && buttons}
        </tr>
    )
}

export default ProductDetail;