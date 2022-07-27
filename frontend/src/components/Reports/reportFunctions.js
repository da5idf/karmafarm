import { formatDate, getOrderTotal } from "../../utils";

export const restaurantLineChart = (orders, start, end) => {
    if (!orders) return;

    const labels = [];
    const dataPoints = [];

    orders.forEach(order => {
        if (order.dateOfDelivery) {
            start = new Date(start).getTime();
            end = new Date(end).getTime();
            // remove timezone difference on database date string
            let delivery = new Date(order.dateOfDelivery.split("T")[0]).getTime();
            if (start <= delivery && end >= delivery) {
                // two quantities here split by '/'
                // enables us to access both data values from context in the plugin callbacks below
                labels.push(`Order ${order.id} - ${formatDate(order.dateOfDelivery)}`);
                dataPoints.push(getOrderTotal(order, true));
            }
        }
    })
    const data = {
        labels,
        datasets: [
            {
                label: "Order Total",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: dataPoints
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, ticks) {
                        return '$' + value;
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        // format the tooltip label to include a dollar sign
                        return `${context.label.split(" - ")[0]}:  $${context.formattedValue}`
                    },
                    title: function (context) {
                        // for some reason context is an array here.
                        return context[0].label.split(" - ")[1];
                    }
                }
            }
        }
    }
    return [data, options]
}

export const restaurantDonutChart = (orders, start, end) => {
    if (!orders) return;

    const products_costs = {};

    orders.forEach(order => {
        if (order.dateOfDelivery) {
            order.Orders_Products.forEach(order_product => {
                const product = order_product.Product
                if (products_costs[product.name]) {
                    products_costs[product.name] += parseInt(product.pricePerPound) * parseInt(order_product.weight);
                } else {
                    products_costs[product.name] = parseInt(product.pricePerPound) * parseInt(order_product.weight);
                }
            })
        }
    })
    const labels = Object.keys(products_costs);
    const dataPoints = Object.values(products_costs);
    const data = {
        labels,
        datasets: [
            {
                label: "Order Totals",
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                data: dataPoints
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        // format the tooltip label to include a dollar sign
                        return `${context.label}:  $${context.formattedValue}`
                    }
                }
            }
        },
        title: {
            display: true,
            text: "NEW TITLE"
        }
    }

    return [data, options]
}