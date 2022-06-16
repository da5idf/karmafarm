import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { createFeedback } from "../../store/feedback";

import "./FeedbackForm.css"

function FeedbackForm({ user, orders }) {
    const dispatch = useDispatch();

    const orderIds = orders.map(order => order.id)

    const [text, setText] = useState("");
    const [orderId, setOrderId] = useState("");
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState("");
    const [error, setError] = useState("");

    const submitFeedback = (e) => {
        e.preventDefault();
        if (text.length <= 10) {
            setError("Minimum 10 characters")
            return;
        }
        const feedback = {
            text,
            userId: user.id,
            restaurantId: 1, // need to fix this ************
            orderId: 1, // need to fix this ************
            productId: 1, // need to fix this ************
        }
        dispatch(createFeedback(feedback))
        toggleConfirm();
        setText("");
    }

    const toggleConfirm = () => {
        const modal = document.getElementById("feedback-confirmation-modal")
        modal.style.display = "flex";
        setTimeout(() => {
            modal.style.display = "none";
        }, 1500)
    }

    const orderSelected = (e) => {
        const id = e.target.value;

        const orderProducts = orders.find(order => {
            return order.id.toString() === id
        }).Orders_Products

        let temp = []
        orderProducts.forEach(record => {
            console.log(record.Product)
            temp.push(record.Product)
        })
        setProducts(temp)
    }

    return (
        <form id="feedback-form-hero" onSubmit={submitFeedback}>
            <div
                id="feedback-form-title"
                className="page-subtitle"
            >
                Submit feedback on an order</div>
            <div id="feedback-selectors">
                <select
                    onChange={orderSelected}
                >
                    <option value="" >What order is this for?</option>
                    {
                        orders.map(order => {
                            return (
                                <option
                                    value={order.id}
                                    key={uuidv4()}
                                >
                                    Order {order.id}
                                </option>
                            )
                        })
                    }
                </select>
                <select
                    onChange={(e) => setOrderId(e.target.value)}
                >
                    <option value="" >What product is this for?</option>
                    {
                        products && products.map(product => {
                            return (
                                <option
                                    value={product.id}
                                    key={uuidv4()}
                                    onChange={(e) => setProductId(e.target.value)}
                                >
                                    {product.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                minLength="10"
                id="feedback-text"
            />
            <div id="feedback-error-submit-container">
                {error && <div id="feedback-error">{error}</div>}
                <button
                    id="feedback-submit-button"
                    className="green-button"
                    type="submit"
                >
                    Submit feedback
                </button>
            </div>
            <div id="feedback-confirmation-modal" className="appear-from-right">
                <div>Thanks for your feedback!</div>
            </div>
        </form>
    )
}

export default FeedbackForm;