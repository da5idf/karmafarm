'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Members';
    return queryInterface.bulkInsert(options, [
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
    options.tableName = 'Members';
    return queryInterface.bulkDelete(options);
  }
};
