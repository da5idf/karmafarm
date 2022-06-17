'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Feedback', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      restaurantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Restaurants' }
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Orders' }
      },
      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'Products' }
      },
      text: {
        allowNull: false,
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Feedback');
  }
};