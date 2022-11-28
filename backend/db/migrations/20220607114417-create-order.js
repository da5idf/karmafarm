'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      restaurantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Restaurants' }
      },
      dateOfDelivery: {
        type: Sequelize.DATE
      },
      submitted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      delivered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      paid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    }, options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders', options);
  }
};