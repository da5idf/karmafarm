import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";

function NewRestaurant() {

    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [errors, setErrors] = useState([]);

    const handleNext = async (e) => {
        e.preventDefault();
        const restaurantNumber = number.split("-").join("");

        // setErrors("");
        csrfFetch('/api/restaurants', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                address,
                restaurantNumber,
                ownerId: user.id
            })
        })
            .then(async (res) => {
                const newRestaurant = await res.json();
                csrfFetch('/api/members', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user.id,
                        restaurantId: newRestaurant.id
                    })
                }).then(() => {
                    history.push("/")
                })
            })
            .catch(async (res) => {
                const data = await res.json();
                setErrors(data.errors)
            })
    }

    return (
        <>
            <form className="signup-form" onSubmit={handleNext}>
                {errors.map((error, idx) => (
                    <div className="signup-error" key={idx}>{error}</div>)
                )}
                <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Please enter your restaurant's name"
                    required
                />
                <input
                    type="text"
                    className="form-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Please enter your restaurant's address"
                    required
                />
                <div className="phone-format">Please input in xxx-xxx-xxxx format.</div>
                <input
                    type="text"
                    className="form-input"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Please enter your restaurant's phone number"
                    required
                />
                <div className="fields-required">All fields are required</div>
                <div id="new-rest-buttons" className='signup-button-container'>
                    <button
                        type="submit"
                        id="restaurant-next-button"
                        className="bb-wt submit-button"
                    >
                        Next
                    </button>
                </div>
            </form>
        </>
    )
}

export default NewRestaurant;