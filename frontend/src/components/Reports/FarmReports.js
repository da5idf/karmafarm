import React, { useState } from 'react';
import Calendar from "react-calendar";


export default function FarmReports() {

    const [fromDate, setFromDate] = useState(null);

    return (
        <div className="page-hero">
            <div
                className="datepicker"
            >
                <input
                    type="date"
                    onChange={(e) => setFromDate(e.target.value)}
                    value={fromDate}
                    activeStartDate={new Date()}
                />
            </div>
        </div>
    )
}
