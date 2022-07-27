import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'

import './RestaurantReports.css'
import DatePicker from './DatePicker';
import { restaurantLineChart, restaurantDonutChart } from './reportFunctions';
import { getRestaurantOrders } from '../../store/orders';
import { getUserRestaurants } from '../../store/users';
import InfoModal from '../InfoModal/InfoModal';

Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export default function RestaurantReports() {
    const dispatch = useDispatch();

    const orderObjs = useSelector(state => state.orders.restaurantOrders);
    const orders = Object.values(orderObjs);
    const user = useSelector(state => state.session.user);

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [viewGraph, setViewGraph] = useState(false);
    const [lineGraph, setLineGraph] = useState(true);
    const [data, setData] = useState({
        labels: {},
        datasets: []
    });
    const [options, setOptions] = useState({});
    const [showModal, setShowModal] = useState(false);

    const generateGraph = (e) => {
        // error handle if no dates have been selected
        if (!fromDate || !toDate) {
            setShowModal(true);
            return
        }

        if (lineGraph) {
            const [lineData, lineOptions] = restaurantLineChart(orders, fromDate, toDate);
            setData(lineData);
            setOptions(lineOptions);
        }
        else {
            const [donutData, donutOptions] = restaurantDonutChart(orders, fromDate, toDate);
            setData(donutData);
            setOptions(donutOptions);
        }
        setViewGraph(true);
    }

    const handleSelection = () => {
        setViewGraph(false);
        setLineGraph(!lineGraph);
    }

    useEffect(() => {

    }, [viewGraph])

    useEffect(() => {
        if (!Object.values(orders).length) {
            dispatch(getUserRestaurants(user.id))
                .then(restaurant => {
                    dispatch(getRestaurantOrders(restaurant.id))
                })
        }
    }, [dispatch, user.id, orders])

    if (showModal) {
        return (
            <InfoModal
                titleText={"Dates Not Selected"}
                content={"Please select From and To dates in order to generate a graph."}
                handleClose={() => setShowModal(false)}
            />
        )
    }

    return (
        <div className="page-hero">
            <div className="page-content">
                <div className="page-title">Report Center</div>
                <DatePicker
                    fromDate={fromDate}
                    toDate={toDate}
                    fromSetter={setFromDate}
                    toSetter={setToDate}
                />
                <div id="restaurant-report-inputs">
                    <input
                        type="checkbox"
                        id="restaurant-line"
                        checked={lineGraph}
                        onChange={handleSelection}
                    />
                    <label
                        htmlFor="restaurant-line"
                    >
                        <i className="fa-solid fa-chart-line"></i>
                        Order Totals Over Time
                    </label>
                    <input
                        type="checkbox"
                        id="restaurant-donut"
                        checked={!lineGraph}
                        onChange={handleSelection}
                    />
                    <label
                        htmlFor="restaurant-donut"
                    >
                        <i className="fa-solid fa-chart-pie"></i>
                        Breakdown by Product
                    </label>
                </div>
                <button
                    id="report-query"
                    className="green-button"
                    onClick={generateGraph}
                >
                    Query Results
                </button>
                <div id="graph-container">
                    {viewGraph && lineGraph &&
                        <Line
                            data={data}
                            options={options}
                        />
                    }
                    {viewGraph && !lineGraph &&
                        <Doughnut
                            data={data}
                            options={options}
                        />
                    }
                </div>
            </div>
        </div>
    )
}
