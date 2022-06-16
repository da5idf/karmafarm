'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    restaurantId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Restaurants' }
    },
    orderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Orders' }
    },
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Products' }
    },
    text: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    freezeTableName: true
  });
  Feedback.associate = function (models) {
    Feedback.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' })
    Feedback.belongsTo(models.Order, { foreignKey: 'orderId' })
    Feedback.belongsTo(models.Product, { foreignKey: 'productId' })
    Feedback.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Feedback;
};