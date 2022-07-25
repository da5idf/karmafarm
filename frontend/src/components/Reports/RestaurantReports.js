import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

import './RestaurantReports.css'
import DatePicker from './DatePicker';
import { restaurantLineChart, restaurantDonutChart } from './reportFunctions';
import { getRestaurantOrders } from '../../store/orders';
import { getUserRestaurants } from '../../store/users';

Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement);

export default function RestaurantReports() {
    const dispatch = useDispatch();

    const orderObjs = useSelector(state => state.orders.restaurantOrders);
    const orders = Object.values(orderObjs);
    const user = useSelector(state => state.session.user);

    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [lineGraph, setLineGraph] = useState(true);

    const generateGraph = () => {

    }

    const handleSelection = () => {
        setLineGraph(!lineGraph);
    }

    const options = {
        maintainAspectRatio: false
    }

    useEffect(() => {
        if (!Object.values(orders).length) {
            dispatch(getUserRestaurants(user.id))
                .then(restaurant => {
                    dispatch(getRestaurantOrders(restaurant.id))
                })
        }
    }, [dispatch, user.id, orders])

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
                        Line Graph
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
                        Donut Graph
                    </label>
                </div>
                <button>
                    Query Results
                </button>
                <div id="graph-container">
                    {orders.length && lineGraph ?
                        <Line
                            data={restaurantLineChart(orders)}
                            options={options}
                        />
                        :
                        <Doughnut
                            data={restaurantDonutChart(orders)}
                            options={options}
                        />
                    }
                </div>
            </div>
        </div>
    )
}
