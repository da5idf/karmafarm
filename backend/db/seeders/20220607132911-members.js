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
      {
        userId: 5,
        restaurantId: 1,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Members', null, {});
  }
};
