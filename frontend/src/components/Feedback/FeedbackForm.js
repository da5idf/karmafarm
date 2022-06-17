import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { createFeedback } from "../../store/feedback";

import "./FeedbackForm.css"

function FeedbackForm({ user, orders }) {
    const dispatch = useDispatch();

    const restaurantId = useSelector(state => state.users.restaurant.id)

    const [text, setText] = useState("");
    const [orderId, setOrderId] = useState("");
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState("");
    const [errors, setErrors] = useState({});

    const submitFeedback = (e) => {
        e.preventDefault();

        if (!validateFeedback()) return;

        const feedback = {
            text,
            userId: user.id,
            restaurantId,
            orderId,
        }
        if (productId) feedback.productId = productId;
        dispatch(createFeedback(feedback))
        toggleConfirm();
        setText("");
        setOrderId("");
    }

    const validateFeedback = () => {
        let newErrors = {};
        let valid = true;

        if (text.length <= 10) {
            newErrors.text = "Minimum 10 characters";
            valid = false;
        }
        if (text.length > 150) {
            newErrors.text = "Maximum 150 characters";
            valid = false;
        }
        if (!orderId) {
            newErrors.orderId = "Please select an order";
            valid = false;
        }

        setErrors(newErrors)
        setTimeout(() => {
            setErrors({})
        }, 3000)
        return valid;
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

        if (id) {
            const orderProducts = orders.find(order => {
                return order.id.toString() === id
            }).Orders_Products

            let temp = []
            orderProducts.forEach(record => {
                temp.push(record.Product)
            })
            setProducts(temp);
        }

        setOrderId(id);
    }

    const updateText = (e) => {
        let newErrors = {};

        let value = e.target.value;

        if (value.length > 150) {
            newErrors.text = "Maximum 150 characters";
        }

        value = value.slice(0, 150)
        setText(value);
        setErrors(newErrors)
        setTimeout(() => {
            setErrors({})
        }, 3000)
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
                    className="form-input"
                    value={orderId}
                    onChange={orderSelected}
                >
                    <option value="">What order is this for?</option>
                    {
                        orders.filter(order => {
                            const now = new Date().getTime();
                            if (!order.dateOfDelivery) return false;
                            const deliveryDay = new Date(order.dateOfDelivery).getTime();
                            return deliveryDay < now;
                        }).map(order => {
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
                    className="form-input"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                >
                    <option value="">What product is this for?</option>
                    {
                        products && products.map(product => {
                            return (
                                <option
                                    value={product.id}
                                    key={uuidv4()}
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
                onChange={updateText}
                minLength="10"
                id="feedback-text"
            />
            <div id="feedback-error-submit-container">
                <div id="feedback-errors">
                    {errors.text && <div id="feedback-error">{errors.text}</div>}
                    {errors.orderId && <div id="feedback-error">{errors.orderId}</div>}
                </div>
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