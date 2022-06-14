import React, { useState } from "react";

import "./Search.css"

function Search({ products, setFilteredProducts }) {

    const [query, setQuery] = useState("");

    const filterResults = (e) => {
        console.log(e.target.value);
        setQuery(e.target.value)
        const filtered = products.filter(product => {
            console.log("q", query)
            return product.name.toLowerCase().includes(query?.toLowerCase())
        })
        setFilteredProducts(filtered)
        //.map((item, idx) => {
        //     return (
        //         <div
        //             className="search-result"
        //             key={idx}
        //         >
        //             {item.name}
        //         </div>
        //     )
        // })
    }

    return (
        <div id="search-wrapper">
            <input
                id="search-input"
                className="form-input"
                placeholder="Search products by name..."
                value={query}
                onChange={filterResults}
            >
            </input>
            {/* <div id="search-results-container">
                {
                    query && filterResults()
                }
            </div> */}
        </div>

    )

}

export default Search