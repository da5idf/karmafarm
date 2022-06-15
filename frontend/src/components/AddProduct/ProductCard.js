import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { useLongPress } from "use-long-press";

import "./ProductCard.css"
import { deleteProduct } from "../../store/products"

function ProductCard({ product, props }) {
    const dispatch = useDispatch();

    const [error, setError] = useState(false);

    const fillForm = (e) => {
        e.preventDefault();
        // clear out any prior errors
        props.setErrors({});

        // clear out input file selection
        props.setImgFile("");
        const inputElement = document.getElementById("new-imgFile");
        inputElement.value = "";

        // set all other state vars
        props.setProductId(product.id);
        props.setName(product.name);
        props.setDescription(product.description);
        props.setPrice(product.pricePerPound);
        props.setActive(product.active);
        props.setType(product.type);
        props.setImgUrl(product.imgUrl);
        props.setInEdit(true);
    }

    const cb = () => {
        const deleteModal = document.getElementById(`${product.id}-delete`);
        deleteModal.style.display = "flex";
    }

    const bind = useLongPress(cb, {
        threshold: 750,
        captureEvent: true,
        cancelOnMovement: false,
    })

    const cancelDelete = () => {
        const deleteModal = document.getElementById(`${product.id}-delete`);
        deleteModal.style.display = "none";
    }

    const confirmDelete = () => {
        dispatch(deleteProduct(product.id))
            .catch((e) => {
                setError(true);
                setTimeout(() => {
                    const deleteModal = document.getElementById(`${product.id}-delete`);
                    deleteModal.style.display = "none";
                    setError(false);
                }, 2500)
            })
        props.clearSelection();
    }

    // render the correct img based on file upload
    const renderImage = () => {
        if (product.imgFile) {
            const url = URL.createObjectURL(product.imgFile)
            return <img className="product-card-img" src={url} alt="" />
        }
        else if (product.imgUrl) {
            return <img className="product-card-img" src={product.imgUrl} alt="" />
        }
        else {
            return <div id="product-card-img-placeholder"></div>
        }
    }

    return (
        <div className="product-card-hero">
            <div className="product-card-wrapper"
                onClick={fillForm}
                {...bind()}
            >
                {
                    renderImage()
                }
                <div className="product-card-right">
                    <div className="product-card-titles">
                        <div className="page-subtitle product-card-name">{product.name}</div>
                        <div className="product-card-description">{product.description}</div>
                    </div>
                    <div className="product-card-info">
                        <div className="product-card-active-container">
                            <div>Price pp</div>
                            <div>${product.pricePerPound}</div>
                        </div>
                        <div className="product-card-price-container">
                            <div>Active</div>
                            <div>
                                {product.active ? "Yes" : "No"}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div
                className="delete-product-wrapper appear-from-right"
                id={`${product.id}-delete`}
            >
                <button
                    id={`${product.id}-delete-confirm`}
                    className="product-delete-confirm green-button"
                    onClick={confirmDelete}
                >
                    Confirm
                </button>
                <button
                    id={`${product.id}-delete-cancel`}
                    className="product-delete-cancel"
                    onClick={cancelDelete}
                >
                    Cancel
                </button>
                {error &&
                    <div id="delete-error-modal">
                        <div>Error: products that are on orders can't be deleted</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductCard;