'use strict';
const now = new Date().getTime()
const day = 24 * 60 * 60 * 1000
const oneDayAgo = new Date(now - day)
const tenDaysAgo = new Date(now - 10 * day)
const oneDayAhead = new Date(now + day)
const tenDaysAhead = new Date(now + 10 * day)

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Orders';
    return queryInterface.bulkInsert(options, [
      {
        restaurantId: 1,
        submitted: true,
        delivered: true,
        dateOfDelivery: tenDaysAgo,
        paid: true,
      },
      {
        restaurantId: 1,
        submitted: true,
        delivered: true,
        dateOfDelivery: oneDayAgo,
      },
      {
        restaurantId: 1,
        submitted: true,
        dateOfDelivery: oneDayAhead,
      },
      {
        restaurantId: 1,
      },
      {
        restaurantId: 2,
        submitted: true,
        delivered: true,
        dateOfDelivery: tenDaysAgo,
        paid: true,
      },
      {
        restaurantId: 2,
        submitted: true,
        delivered: true,
        dateOfDelivery: oneDayAgo,
      },
      {
        restaurantId: 2,
        submitted: true,
        dateOfDelivery: tenDaysAhead,
      },
      {
        restaurantId: 2,
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Orders';
    return queryInterface.bulkDelete(options);
  }
};
