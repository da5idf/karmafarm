'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Restaurants';
    return queryInterface.bulkInsert(options, [
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
    options.tableName = 'Restaurants';
    return queryInterface.bulkDelete(options);
  }
};
