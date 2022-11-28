'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Feedback';
    return queryInterface.bulkInsert(options, [
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
    options.tableName = 'Feedback';
    return queryInterface.bulkDelete(options);
  }
};
