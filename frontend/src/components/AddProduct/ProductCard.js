import React from "react";

import "./ProductCard.css"

function ProductCard({ product }) {
    return (
        <div className="product-card-wrapper"
            onClick={() => console.log(product.id)}
        >
            <img className="product-card-img" src={product.imgUrl} alt="" />
            <div className="product-card-right">
                <div className="product-card-titles">
                    <div className="page-subtitle product-card-name">{product.name}</div>
                    <div className="product-card-description">{product.description}</div>
                </div>
                <div className="product-card-info">
                    <div className="product-card-active-container">
                        <div>Price pp</div>
                        <div>{product.pricePerPound}</div>
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