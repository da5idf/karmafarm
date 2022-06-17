import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./OrderProduct.css"
import ProductButtons from "./ProductButtons";
import { addProductToOrder, deleteRecordFromOrder, deleteWholeOrder, updateRecordOnOrder } from "../../store/orders"
import DeleteOrderModal from "./DeleteOrderModal";


function OrderProduct({ product, orderId, orderRecords }) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)

    let productWeight, onThisOrder;
    for (let i = 0; i < orderRecords.length; i++) {
        if (orderRecords[i].productId === product.id) {
            productWeight = orderRecords[i].weight;
            onThisOrder = true;
        }
    }

    const [quantity, setQuantity] = useState(productWeight || "");
    const [subTotal, setSubTotal] = useState((quantity * product.pricePerPound).toFixed(2));
    const [onOrder, setOnOrder] = useState(onThisOrder);
    const [errMsg, setErrMsg] = useState("");
    const [deleteOrderModal, setDeleteOrderModal] = useState(false);

    const updateQuantity = (e) => {
        setQuantity(e.target.value)
        const value = e.target.value

        if (!validQuantity(value)) {
            if (value > 200 || value < 0) {
                setQuantity(value.toString().slice(0, 6))
                e.target.style.color = "red"
                setSubTotal("Invalid")
                return;
            }
        }

        e.target.style.color = "black"
        const total = value * product.pricePerPound;
        setSubTotal(total.toFixed(2))
    }

    const addToCart = () => {
        if (!validQuantity(quantity)) return
        toggleModal();

        const newRecord = {
            orderId,
            productId: product.id,
            userId: user.id,
            weight: quantity
        }

        dispatch(addProductToOrder(newRecord))
        setOnOrder(true);
    }

    const updateCart = () => {
        if (!validQuantity(quantity)) return
        toggleModal()
        const record = orderRecords.find(record => record.productId === product.id)
        dispatch(updateRecordOnOrder(record.id, quantity))
    }

    const handleRemove = () => {
        if (validateRemoval()) removeFromCart();
    }

    const removeFromCart = () => {
        toggleModal()
        const record = orderRecords.find(record => record.productId === product.id)
        dispatch(deleteRecordFromOrder(record.id))
        setQuantity("");
        setSubTotal(0.00);
        setOnOrder(false);
    }

    const validateRemoval = () => {
        if (orderRecords.length > 1) return true;

        setDeleteOrderModal(true);
    }

    const validQuantity = (value) => {
        if (!value || value <= 0) {
            toggleErrorModal();
            setErrMsg("Quantity must be > 0")
            return false;
        }
        if (value > 200) {
            setErrMsg("200# max on order")
            toggleErrorModal();
            return false;
        }
        const valStr = value.toString();
        const decimals = valStr.split(".")[1];
        if (decimals && decimals.length > 2) {
            setQuantity(valStr.slice(0, valStr.length - 1))
            setErrMsg("2 decimals max");
            toggleErrorModal();
            return false;
        }
        // if (value.toString().length > 6) {
        //     setQuantity(valStr.slice(6))
        //     setErrMsg("2 decimals max");
        //     toggleErrorModal();
        //     return false;
        // }
        return true
    }

    const toggleErrorModal = () => {
        const modal = document.getElementById(`modal-error-${product.id}`)
        modal.style.display = "block"
        setTimeout(() => {
            modal.style.display = "none"
        }, 1400)
    }

    const toggleModal = () => {
        const modal = document.getElementById(`modal-confirm-${product.id}`)
        modal.style.display = "block"
        setTimeout(() => {
            modal.style.display = "none"
        }, 1400)
    }

    const props = {
        onOrder, setOnOrder,
        addToCart,
        updateCart,
        handleRemove
    }

    return (
        <>
            <div id="product-hero">
                <div id="op-product-top">
                    <div id="op-img-container">
                        <img id="op-product-img" src={product.imgUrl} alt="" />
                        <div id="op-product-name">{product.name}</div>
                    </div>
                </div>
                <div id="op-product-bottom">
                    <div id="op-product-description">{product.description}</div>
                    <div id="op-pricing-grid">
                        <div id="op-grid-left">
                            <div id="op-product-ppp">${product.pricePerPound} per pound</div>
                            <div id="input-container">
                                <input
                                    id="op-product-quantity"
                                    value={quantity}
                                    type="number"
                                    onChange={updateQuantity}
                                />
                                <div id="input-container-label">pounds</div>
                            </div>
                        </div>
                        <div id="op-grid-right">
                            <div>Item total</div>
                            <div id="op-product-subtotal">{`$${subTotal}`}</div>
                        </div>
                    </div>
                    <ProductButtons props={props} />
                </div>
                <div className="confirmation-modal yellow-bg" id={`modal-confirm-${product.id}`}>
                    Cart Updated!
                </div>
                <div className="confirmation-modal yellow-bg" id={`modal-error-${product.id}`}>
                    {errMsg}
                </div>
                {
                    deleteOrderModal &&
                    <DeleteOrderModal
                        setDeleteOrderModal={setDeleteOrderModal}
                        orderId={orderId}
                    />
                }
            </div>
        </>
    )
}

export default OrderProduct;