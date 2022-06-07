'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Feedback', [
      {
        userId: 2,
        restaurantId: 1,
        orderId: 4,
        productId: 2,
        text: 'Damaged on delivery'
      },
      {
        userId: 2,
        restaurantId: 1,
        orderId: 2,
        productId: 8,
        text: 'So good!'
      },
      {
        userId: 3,
        restaurantId: 2,
        orderId: 8,
        productId: 3,
        text: 'Holy moly, really enjoyed these.'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Feedback', null, {});
  }
};
