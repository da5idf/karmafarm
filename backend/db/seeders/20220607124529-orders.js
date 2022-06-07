'use strict';

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
        submitted: true
      },
      {
        restaurantId: 1,
        submitted: true,
        delivered: true,
      },
      {
        restaurantId: 1,
        submitted: true,
        delivered: true,
        paid: true,
      },
      {
        restaurantId: 2,
      },
      {
        restaurantId: 2,
        submitted: true
      },
      {
        restaurantId: 2,
        submitted: true,
        delivered: true,
      },
      {
        restaurantId: 2,
        submitted: true,
        delivered: true,
        paid: true,
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
