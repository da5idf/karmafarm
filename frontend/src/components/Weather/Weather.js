import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import './Weather.css'
import Forecast from './Forecast';
import { getWeather } from '../../store/weather';

function Weather() {
    const dispatch = useDispatch();

    const weather = useSelector(state => state.weather);

    useEffect(() => {
        dispatch(getWeather());
    }, [dispatch])

    if (!weather.location) {
        return <></>
    }

    return (
        <div id="weather-container">
            <div className='page-subtitle'>
                {`It's currently ${Math.floor(weather.current.temp_f)}°F at the farm`}
            </div>
            <div id="current-weather">
                <div className="current-weather-subtitle">Conditions are: </div>
                <div id="current-weather-condidtion" className="current-weather-subtitle">{weather.current.condition.text}</div>
                <img id="current-weather-icon" src={weather.current.condition.icon} alt="" />
            </div>
            <div id="weather-forecast">
                {weather.forecast.forecastday.map((day, idx) => {
                    // get name of the day
                    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    const dayIdx = new Date().getDay();
                    const nameOfDay = days[(dayIdx + idx + 1) % 7]

                    return <Forecast day={day.day} nameOfDay={nameOfDay} key={uuidv4()} />
                })}
            </div>
        </div>
    )
}

export default Weather;