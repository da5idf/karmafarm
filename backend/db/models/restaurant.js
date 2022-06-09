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
          attributes: ["id", "name"]
        }
      }
    });

  Restaurant.associate = function (models) {
    Restaurant.belongsTo(models.User, { foreignKey: 'ownerId' })
    Restaurant.hasMany(models.Member, { foreignKey: 'restaurantId' })

    const columnMapping = {
      through: "Member",
      otherKey: "userId",
      foreignKey: "restaurantId"
    }
    Restaurant.belongsToMany(models.User, columnMapping)
  };
  return Restaurant;
};