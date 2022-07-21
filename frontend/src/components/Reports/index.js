import React from 'react';

import RestaurantReports from './RestaurantReports';
import FarmReports from './FarmReports';

export default function Reports({ user }) {

    if (!user.farmer) return <RestaurantReports />

    return <FarmReports />
}
