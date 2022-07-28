import React, { useState } from 'react';

import DatePicker from './DatePicker';

export default function FarmReports() {

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    return (
        <div className="page-hero">
            <div className="page-content">
                <div className="page-title">Farm reports feature coming soon!</div>
                <DatePicker
                    fromDate={fromDate}
                    toDate={toDate}
                    fromSetter={setFromDate}
                    toSetter={setToDate}
                />
            </div>
        </div>
    )
}
