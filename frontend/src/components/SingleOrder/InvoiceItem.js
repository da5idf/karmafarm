import React from "react";

function InvoiceItem({ record, idx }) {

    const subTotal = record.weight * record.Product.pricePerPound;

    return (
        <tr>
            <td>{idx + 1}</td>
            <td>{record.Product.name}</td>
            <td>${Number(record.weight).toFixed(2)}</td>
            <td>${subTotal.toFixed(2)}</td>
        </tr>
    )
}

export default InvoiceItem;