'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Members', [
      {
        userId: 2,
        restaurantId: 1,
      },
      {
        userId: 3,
        restaurantId: 2,
      },
      {
        userId: 4,
        restaurantId: 2,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Members', null, {});
  }
};
