'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User_UpdateMessages', [
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
    return queryInterface.bulkDelete('User_UpdateMessages', null, {});
  }
};
