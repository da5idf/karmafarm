import { formatDate, getOrderTotal } from "../../utils";

export const restaurantLineChart = (orders) => {

    if (!orders) return;

    const labels = [];
    const data = [];

    orders.forEach(order => {
        if (order.dateOfDelivery) {
            labels.push(formatDate(order.dateOfDelivery));
            data.push(getOrderTotal(order, true));
        }
    })
    console.log(labels, data);
    return {
        labels,
        datasets: [
            {
                label: "Order Totals",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data
            }
        ]
    }
}

export const restaurantDonutChart = (orders) => {

    if (!orders) return;

    const labels = [];
    const data = [];

    orders.forEach(order => {
        if (order.dateOfDelivery) {
            labels.push(formatDate(order.dateOfDelivery));
            data.push(getOrderTotal(order, true));
        }
    })
    console.log(labels, data);
    return {
        labels,
        datasets: [
            {
                label: "Order Totals",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data
            }
        ]
    }
}