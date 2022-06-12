'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants', [
      {
        name: 'The Dabney',
        restaurantNumber: 1234567891,
        address: '122 Blagden Alley NW, Washington, DC 20001',
        ownerId: 2,
      },
      {
        name: 'Magdalena',
        restaurantNumber: 1234567800,
        address: '205 E Biddle St, Baltimore, MD 21202',
        ownerId: 3,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
