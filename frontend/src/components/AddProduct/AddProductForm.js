import React, { useState } from "react";
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
        imgFile, setImgFile,
        inEdit, setInEdit,
        productId,
        clearSelection,
        errors, setErrors
    } = props

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const handleSubmit = (e) => {
        e.preventDefault()
        const valid = validateSubmit();

        if (valid) {
            const product = {
                name,
                description,
                pricePerPound,
                active,
                type,
                image: imgFile,
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
    }

    const validateSubmit = () => {
        setErrors({});
        const newErrors = Object.assign({}, errors)
        let valid = true;
        if (!name) {
            newErrors.name = "Name is required";
            valid = false;
        }
        if (!description) {
            newErrors.description = "Description is required, max 100 characters";
            valid = false;
        }
        if (pricePerPound <= 0) {
            newErrors.ppp = "ppp > 0";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    const handleClear = (e) => {
        e.preventDefault();
        clearSelection();
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImgFile(file);
    }

    return (
        <form
            id="new-edit-product-form"
            onSubmit={handleSubmit}
        >
            <div className="newform-field">
                {errors.name && <div className="new-edit-error">{errors.name}</div>}
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
                {errors.description && <div className="new-edit-error">{errors.description}</div>}
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
                    {errors.ppp && <div className="new-edit-error">{errors.ppp}</div>}
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
            <div className="double-form-field">
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
                    <label id="new-img-title">Product Image</label>
                    <label id="new-img-label" htmlFor="new-imgFile">
                        <input
                            id="new-imgFile"
                            className="form-input"
                            type="file"
                            accept="image/*"
                            onChange={updateFile}
                        />
                        upload new image
                    </label>
                </div>
            </div>
            <button
                className="basic-button"
                onClick={handleClear}
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