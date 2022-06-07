'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      farm: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pricePerPound: {
        allowNull: false,
        type: Sequelize.NUMERIC
      },
      caseWeight: {
        type: Sequelize.NUMERIC
      },
      casePrice: {
        type: Sequelize.NUMERIC
      },
      featured: {
        type: Sequelize.BOOLEAN
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      farmerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
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
    return queryInterface.dropTable('Products');
  }
};