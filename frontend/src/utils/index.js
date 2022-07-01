import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// script to format a phone-number
export const getFormattedNumber = (number) => {
    const numString = number.toString();
    const first = numString.slice(0, 3) + "-";
    const second = numString.slice(3, 6) + "-"
    const formatted = first + second + numString.slice(6);
    return formatted;
}

// script to format a date
export const formatDate = (dateStr) => {
    if (dateStr) {
        const date = new Date(dateStr);
        return date.toDateString();
    }
    else return ""
}

// script to get total price of an order
export const getOrderTotal = (order) => {
    const orderRecords = order.Orders_Products;
    const total = orderRecords.reduce((accum, record) => {
        accum += record.weight * record.Product.pricePerPound
        return accum
    }, 0)

    if (total === 0) {
        return "$0.00"
    } else {
        return `$${total.toFixed(2)}`
    }
}

// script to copy key to clipboard
export const copyKey = () => {
    const keyElement = document.getElementById("admin-key");
    const keyText = keyElement.innerHTML
    navigator.clipboard.writeText(keyText);
    keyElement.innerHTML = "copied!"
    setTimeout(() => {
        keyElement.innerHTML = keyText;
    }, 1500)
}

// script to create PDF
export const createPDF = (order) => {
    html2canvas(document.getElementById("inner-invoice"), {
        scale: .9
    })
        .then((canvas) => {
            const pdf = new jsPDF();
            pdf.addImage(canvas.toDataURL("image/png"), "PNG", 15, 15);
            pdf.save(`${order.Restaurant.name}-INVOICE-${order.id}`);

        })
}