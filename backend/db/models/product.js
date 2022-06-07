'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    imgUrl: {
      type: DataTypes.STRING
    },
    farm: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    pricePerPound: {
      allowNull: false,
      type: DataTypes.NUMERIC
    },
    caseWeight: {
      type: DataTypes.NUMERIC
    },
    casePrice: {
      type: DataTypes.NUMERIC
    },
    featured: {
      type: DataTypes.BOOLEAN
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    farmerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    }
  }, {});
  Product.associate = function (models) {
    Product.belongsTo(models.User, { foreignKey: 'userId' })
    Product.hasMany(models.Orders_Products, { foreignKey: 'productId' })
    Product.hasMany(models.Feedback, { foreignKey: 'productId' })
  };
  return Product;
};