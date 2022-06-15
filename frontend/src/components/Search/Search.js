import React, { useState } from "react";

import "./Search.css"

function Search({ query, setter }) {
    // const [query, setQuery] = useState("");

    // const updateQuery = (e) => {
    //     setQuery(e.target.value);
    //     filterResults(e);
    // }

    // const filterResults = (e) => {
    //     const filtered = items.filter(item => {
    //         return item.name.toLowerCase().includes(e.target.value.toLowerCase())
    //     })
    //     setter(filtered)
    // }

    const clearSearch = () => {
        // setQuery("");
        // setter(items);
        setter("");
    }

    return (
        <div id="search-wrapper">
            <input
                id="search-input"
                className="form-input"
                placeholder="Search products by name..."
                value={query}
                onChange={(e) => setter(e.target.value)}
            >
            </input>
            <button
                id="clear-search-button"
                className="basic-button"
                onClick={clearSearch}
            >
                Clear Search
            </button>
        </div>

    )

}

export default Search