import React, { useState } from "react";

import "./OrderProduct.css"
import CartModal from "./CartModal";

function OrderProduct({ product }) {

    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    }

    const caseWeight = product.caseWeight ? `${product.caseWeight} pounds` : "No case"
    const casePrice = product.casePrice ? `$ ${product.casePrice}` : "No case"

    return (
        <>
            <div id="product-hero">
                <div id="op-product-name">{product.name}</div>
                <div id="op-product-description">{product.description}</div>
                <div id="op-product-ppp">${product.pricePerPound}</div>
                <div id="op-product-caseWeight">{caseWeight}</div>
                <div id="op-product-casePrice">{casePrice}</div>
                <button
                    id="op-addtocart"
                    onClick={openModal}
                >
                    Add to Cart
                </button>
            </div>
            {modal && <CartModal product={product} setModal={setModal} />}
        </>
    )
}

export default OrderProduct;