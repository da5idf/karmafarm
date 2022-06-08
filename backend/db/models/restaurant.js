'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurantNumber: {
      type: DataTypes.STRING,
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
    },
  },
    {
      scopes: {
        basic: {
          attributes: ["id", "name", "address", "restaurantNumber"]
        }
      }
    });

  Restaurant.associate = function (models) {
    Restaurant.belongsTo(models.User, { foreignKey: 'userId' })
    Restaurant.belongsToMany(models.User, { through: models.Member })
    Restaurant.hasMany(models.Member, { foreignKey: 'restaurantId' })
  };
  return Restaurant;
};