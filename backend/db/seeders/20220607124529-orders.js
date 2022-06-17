'use strict';
const now = new Date().getTime()
const day = 24 * 60 * 60 * 1000
const oneDayAgo = new Date(now - day)
const tenDaysAgo = new Date(now - 10 * day)
const oneDayAhead = new Date(now + day)
const tenDaysAhead = new Date(now + 10 * day)

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Orders', [
      {
        restaurantId: 1,
      },
      {
        restaurantId: 1,
        submitted: true,
        dateOfDelivery: oneDayAhead,
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
        delivered: true,
        dateOfDelivery: tenDaysAgo,
        paid: true,
      },
      {
        restaurantId: 2,
      },
      {
        restaurantId: 2,
        submitted: true,
        dateOfDelivery: tenDaysAhead,
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
        delivered: true,
        dateOfDelivery: tenDaysAgo,
        paid: true,
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
