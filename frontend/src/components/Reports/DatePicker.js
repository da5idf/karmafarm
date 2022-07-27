import React from 'react'

import './DatePicker.css'

export default function DatePicker({ fromDate, toDate, fromSetter, toSetter }) {
    return (
        <div id="date-pickers">
            <div
                className="datepicker"
            >
                <label>
                    From:
                </label>
                <input
                    type="date"
                    onChange={(e) => fromSetter(e.target.value)}
                    value={fromDate}
                />

            </div>
            <div
                className="datepicker"
            >
                <label>
                    To:
                </label>
                <input
                    type="date"
                    onChange={(e) => toSetter(e.target.value)}
                    value={toDate}
                />

            </div>

        </div>
    )
}
