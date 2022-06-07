'use strict';
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};