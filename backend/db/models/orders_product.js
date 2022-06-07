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
    weight: {
      allowNull: false,
      type: DataTypes.NUMERIC
    }
  }, {});
  Orders_Products.associate = function (models) {
    Orders_Products.belongsTo(models.Order, { foreignKey: 'orderId' })
    Orders_Products.belongsTo(models.Product, { foreignKey: 'productId' })
  };
  return Orders_Products;
};