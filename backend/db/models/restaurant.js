'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurantNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    }
  }, {});
  Restaurant.associate = function (models) {
    Restaurant.belongsTo(models.User, { foreignKey: 'userId' })
    Restaurant.hasMany(models.Member, { foreignKey: 'restaurantId' })
  };
  return Restaurant;
};