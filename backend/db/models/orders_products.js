'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orders_Products = sequelize.define('Orders_Products', {
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
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    weight: {
      allowNull: false,
      type: DataTypes.NUMERIC
    }
  }, {});
  Orders_Products.associate = function (models) {
    Orders_Products.belongsTo(models.Order, { foreignKey: 'orderId' })
    Orders_Products.belongsTo(models.Product, { foreignKey: 'productId' })
    Orders_Products.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Orders_Products;
};