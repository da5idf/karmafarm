'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'User_UpdateMessages';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        read: true,
      },
      {
        userId: 2,
        read: true,
      },
      {
        userId: 3,
        read: false,
      },
      {
        userId: 4,
        read: true,
      },
      {
        userId: 5,
        read: true,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'User_UpdateMessages';
    return queryInterface.bulkDelete(options);
  }
};
