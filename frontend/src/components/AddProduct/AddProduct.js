import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./AddProduct.css"
import { getAllProducts } from "../../store/products";
import ProductCard from "./ProductCard";

function AddProduct({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const productsObjs = useSelector(state => state.products.all);
    const products = Object.values(productsObjs);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])

    if (!user.farmer) {
        history.push("/")
    }

    return (
        <div className="page-hero">
            <div className="page-content">
                <div id="farmer-products-list">
                    {products.map(product => (
                        <ProductCard
                            product={product}
                            key={product.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddProduct;