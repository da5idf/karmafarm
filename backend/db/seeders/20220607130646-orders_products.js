'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders_Products', [
      {
        orderId: 4,
        productId: 1,
        userId: 2,
        weight: 2,
      },
      {
        orderId: 4,
        productId: 2,
        userId: 2,
        weight: 3,
      },
      {
        orderId: 4,
        productId: 3,
        userId: 2,
        weight: 3.5,
      },
      {
        orderId: 4,
        productId: 4,
        userId: 2,
        weight: 1.5,
      },
      {
        orderId: 4,
        productId: 5,
        userId: 2,
        weight: 10,
      },
      {
        orderId: 4,
        productId: 6,
        userId: 2,
        weight: 8,
      },
      {
        orderId: 1,
        productId: 7,
        userId: 2,
        weight: 7.5,
      },
      {
        orderId: 2,
        productId: 8,
        userId: 2,
        weight: 3.25,
      },
      {
        orderId: 3,
        productId: 9,
        userId: 2,
        weight: 3,
      },
      {
        orderId: 5,
        productId: 10,
        userId: 3,
        weight: 2,
      },
      {
        orderId: 6,
        productId: 1,
        userId: 3,
        weight: 4.5,
      },
      {
        orderId: 7,
        productId: 2,
        userId: 3,
        weight: 6.5,
      },
      {
        orderId: 8,
        productId: 3,
        userId: 3,
        weight: 7,
      },
      {
        orderId: 8,
        productId: 4,
        userId: 4,
        weight: 7,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders_Products', null, {});
  }
};
