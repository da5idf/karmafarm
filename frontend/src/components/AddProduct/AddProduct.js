import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./AddProduct.css"
import { getAllProducts } from "../../store/products";
import ProductCard from "./ProductCard";
import AddProductForm from "./AddProductForm";
import Search from "../Search/Search";

function AddProduct({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const productsObjs = useSelector(state => state.products.all);
    const products = Object.values(productsObjs);
    products.reverse();
    const [query, setQuery] = useState("");

    const [imgUrl, setImgUrl] = useState("");
    const [imgFile, setImgFile] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [pricePerPound, setPrice] = useState("");
    const [active, setActive] = useState(false);
    const [type, setType] = useState("");
    // const [farm, setFarm] = useState("");
    // const [casePrice, setCasePrice] = useState(0);
    // const [caseWeight, setCaseWeight] = useState(0);
    const [inEdit, setInEdit] = useState(false);
    const [productId, setProductId] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])

    if (!user.farmer) {
        history.push("/")
    }

    const clearSelection = () => {
        const inputElement = document.getElementById("new-imgFile");
        inputElement.value = "";

        setErrors({})
        setName("");
        setDescription("");
        setPrice(0);
        setActive(false);
        setType("");
        setImgFile(undefined);
        setImgUrl("");
        setInEdit(false);
    }

    const props = {
        name, setName,
        description, setDescription,
        pricePerPound, setPrice,
        active, setActive,
        type, setType,
        imgUrl, setImgUrl,
        imgFile, setImgFile,
        productId, setProductId,
        inEdit, setInEdit,
        errors, setErrors,
        clearSelection
    }

    return (
        <div className="page-hero">
            <div className="page-content">
                <div className="page-title">Add or Edit a Product</div>
                <div className="flex-col-center">
                    <div className="page-subtitle">Use the form below to create a new product.</div>
                    <div className="page-subtitle">Click an existing product to edit it.</div>
                    <div className="page-subtitle red-text">Delete an item by clicking and holding.</div>
                </div>
                <div id="add-edit-content">
                    <div id="add-edit-left">
                        <div id="add-edit-form">
                            <AddProductForm props={props} />
                        </div>
                        <ProductCard product={props} />
                    </div>
                    <div id="search-and-product-list">
                        <Search query={query} setter={setQuery} />
                        <div id="farmer-products-list">
                            {products.filter(product => {
                                if (!query) return true;
                                else return product.name.toLowerCase().includes(query.toLowerCase())
                            }).map(product => (
                                <ProductCard
                                    product={product}
                                    props={props}
                                    key={product.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;