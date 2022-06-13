import React from "react";

import "./ProductCard.css"

function ProductCard({ product, props }) {

    const fillForm = () => {
        props.setName(product.name);
        props.setDescription(product.description);
        props.setPrice(product.pricePerPound);
        props.setActive(product.active);
        props.setType(product.type);
        props.setImgUrl(product.imgUrl)
    }

    return (
        <div className="product-card-wrapper"
            onClick={fillForm}
        >
            {
                product.imgUrl ?
                    <img className="product-card-img" src={product.imgUrl} alt="" />
                    :
                    <div id="product-card-img-placeholder"></div>
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
        </div>
    )
}

export default ProductCard;