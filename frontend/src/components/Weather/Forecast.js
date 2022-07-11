import React from 'react'

function Forecast({ day, nameOfDay }) {

    return (
        <div className="forecast-day">
            <div className='forecast-day-top'>
                <div>
                    <div className='forecast-day-name'>{nameOfDay}</div>
                    <div>{day.condition.text}</div>
                </div>
                <img src={day.condition.icon} alt="" />
            </div>
            <div className='forecast-extreme'>
                <div className='forecast-temp-label'>High:</div>
                <div>{Math.floor(day.maxtemp_f)}°F</div>
            </div>
            <div className='forecast-extreme'>
                <div className='forecast-temp-label'>Low:</div>
                <div>{Math.floor(day.mintemp_f)}°F</div>
            </div>
        </div>
    )
}

export default Forecast;