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

    const updatePrice = (e) => {
        setPrice(e.target.value)
        const value = e.target.value

        if (!validPrice(value)) {
            if (value > 100 || value < 0) {
                setPrice(value.toString().slice(0, 6))
                e.target.style.color = "red"
                return;
            }
        }

        e.target.style.color = "black"
        validPrice(value);
    }

    const validPrice = (value) => {
        let newErrors = {};
        setErrors({});
        let valid = true;

        if (!value || value <= 0) {
            newErrors.ppp = "ppp > 0"
            valid = false;
        }
        if (value > 100) {
            newErrors.ppp = "max $100/p"
            valid = false;
        }
        const valStr = value.toString();
        const decimals = valStr.split(".")[1];
        if (decimals && decimals.length > 2) {
            setPrice(valStr.slice(0, valStr.length - 1))
            newErrors.ppp = "2 decimals max";
            valid = false;
        }

        setErrors(newErrors)

        return valid
    }

    const validateSubmit = () => {
        setErrors({});
        const newErrors = Object.assign({}, errors)
        let valid = true;

        if (!name) {
            newErrors.name = "Name is required";
            valid = false;
        }
        if (name.length > 25) {
            newErrors.name = "Name must be less than 25 characters"
        }
        if (!description || description.length > 100) {
            newErrors.description = "Description is required, max 100 characters";
            valid = false;
        }
        if (pricePerPound <= 0) {
            newErrors.ppp = "ppp > 0";
            valid = false;
        }
        if (pricePerPound > 100) {
            newErrors.ppp = "ppp < 100"
            valid = false;
        }
        const decimals = pricePerPound.toString().split(".")[1]
        if (decimals && decimals.length > 2) {
            newErrors.ppp = "Max 2 decimal places"
        }
        if (!inEdit && !imgFile) {
            newErrors.img = "Please add an image"
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

    const updateName = (e) => {
        let newErrors = {};
        setErrors({});

        if (e.target.value.length <= 25) {
            setName(e.target.value);
            return;
        }
        newErrors.name = "Name is at most 25 characters"
        setErrors(newErrors)
    }

    const updateDescription = (e) => {
        let newErrors = {};
        setErrors({});

        if (e.target.value.length <= 100) {
            setDescription(e.target.value);
            return
        }
        newErrors.description = "Description must be less than 100 characters"
        setErrors(newErrors)
    }

    return (
        <form
            id="new-edit-product-form"
            onSubmit={handleSubmit}
        >
            <div className="newform-field">
                {errors.name && <div className="new-edit-error">{errors.name}</div>}
                <label>Name*</label>
                <input
                    id="new-name"
                    className="form-input"
                    type="text"
                    value={name}
                    placeholder="Please enter the product name"
                    onChange={updateName}
                />
            </div>
            <div className="newform-field">
                {errors.description && <div className="new-edit-error">{errors.description}</div>}
                <label>Description*</label>
                <input
                    id="new-description"
                    className="form-input"
                    type="text"
                    value={description}
                    placeholder="Please enter the product description"
                    onChange={updateDescription}
                />
            </div>
            <div className="double-form-field">
                <div className="newform-field">
                    {errors.ppp && <div className="new-edit-error">{errors.ppp}</div>}
                    <label>Price Per Pound*</label>
                    <input
                        id="new-price"
                        className="form-input"
                        value={pricePerPound}
                        type="number"
                        placeholder="Please enter in $/p"
                        pattern="^[1-9]{1,2}[0-9]?\.?[0-9]{1,2}$"
                        onChange={updatePrice}
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
                    <select
                        id="new-type"
                        className="form-input"
                        type="text"
                        value={type}
                        placeholder="Please enter the product type"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">Please select a type</option>
                        <option value="Tomato">Tomato</option>
                        <option value="Collard">Collard</option>
                        <option value="Potato">Potato</option>
                        <option value="Mushroom">Mushroom</option>
                        <option value="Turnip">Turnip</option>
                        <option value="Radish">Radish</option>
                        <option value="Onion">Onion</option>
                        <option value="Garlic">Garlic</option>
                        <option value="Cucumber">Cucumber</option>
                        <option value="Pea">Pea</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="newform-field" id="img-form-field">
                    <label id="new-img-title">Product Image*</label>
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
                    {errors.img && <div id="new-edit-error-img">{errors.img}</div>}
                </div>
            </div>
            <button
                className="basic-button"
                onClick={handleClear}
                type="button"
            >
                Reset inputs
            </button>
            <button
                className="basic-button"
                type="submit"
            >
                {inEdit ? "Confirm Edit" : "Add new product"}
            </button>
            <div id="required-field">*Required Fields</div>
        </form >
    )
}

export default AddProductForm;