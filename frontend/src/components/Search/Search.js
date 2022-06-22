import React from "react";

import "./Search.css"

function Search({ query, setter }) {

    const clearSearch = () => {

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