'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    restaurantId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    dateOfDelivery: {
      type: DataTypes.DATE
    },
    submitted: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    delivered: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    paid: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Order.associate = function (models) {
    Order.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' })
    Order.hasMany(models.Orders_Products, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
      hooks: true
    })
    Order.hasMany(models.Feedback, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
      hooks: true
    })
  };
  return Order;
};