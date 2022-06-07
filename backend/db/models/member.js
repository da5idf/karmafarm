'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
      references: { model: 'Users' }
    },
    restaurantId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Restaurants' }
    }
  }, {});
  Member.associate = function (models) {
    Member.belongsTo(models.User, { foreignKey: 'userId' })
    Member.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' })
  };
  return Member;
};