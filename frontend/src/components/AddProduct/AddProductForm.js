import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../../store/products";

import "./AddProductForm.css"

function AddProductForm({ props }) {
    const {
        name, setName,
        description, setDescription,
        pricePerPound, setPrice,
        active, setActive,
        type, setType,
        imgUrl, setImgUrl,
        inEdit, setInEdit,
        productId
    } = props

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const handleSubmit = (e) => {
        e.preventDefault()

        const product = {
            name,
            description,
            pricePerPound,
            active,
            type,
            imgUrl,
            farmerId: user.id
        }

        if (!inEdit) {
            dispatch(createProduct(product));
        } else {
            product.id = productId
            dispatch(updateProduct(product));
        }
        clearSelection();
        setInEdit(false);
    }

    const clearSelection = () => {
        setName("");
        setDescription("");
        setPrice(0);
        setActive(false);
        setType("");
        setImgUrl("");
    }

    return (
        <form
            id="new-edit-product-form"
            onSubmit={handleSubmit}
        >
            <div className="newform-field">
                <label>Name</label>
                <input
                    id="new-name"
                    className="form-input"
                    type="text"
                    value={name}
                    placeholder="Please enter the product name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="newform-field">
                <label>Description</label>
                <input
                    id="new-description"
                    className="form-input"
                    type="text"
                    value={description}
                    placeholder="Please enter the product description"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="double-form-field">

                <div className="newform-field">
                    <label>Price Per Pound</label>
                    <input
                        id="new-price"
                        className="form-input"
                        value={pricePerPound}
                        placeholder="Please enter in #s"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="newform-field">
                    <label id="active-label">Is this item active?</label>
                    <div className="toggle-container">
                        <input
                            id="new-active"
                            className="toggle-switch"
                            type="checkbox"
                            checked={active}
                            onChange={() => setActive(!active)}
                        />
                        <label htmlFor="new-active"></label>
                    </div>
                </div>
            </div>
            <div className="newform-field">
                <label>Type</label>
                <input
                    id="new-type"
                    className="form-input"
                    type="text"
                    value={type}
                    placeholder="Please enter the product type"
                    onChange={(e) => setType(e.target.value)}
                />
            </div>
            <div className="newform-field">
                <label>Product Image</label>
                <input
                    id="new-imgUrl"
                    className="form-input"
                    type="text"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                />
            </div>
            <div id="new-edit-errors-container">

            </div>
            <button
                className="basic-button"
                onClick={clearSelection}
            >
                Reset inputs
            </button>
            <button
                className="basic-button"
                type="submit"
            >
                {inEdit ? "Confirm Edit" : "Add new product"}
            </button>
        </form >
    )
}

export default AddProductForm;