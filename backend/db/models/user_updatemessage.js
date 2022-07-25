'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_UpdateMessage = sequelize.define('User_UpdateMessage', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {});
  User_UpdateMessage.associate = function (models) {
    User_UpdateMessage.belongsTo(models.User, { foreignKey: "userId" })
  };
  return User_UpdateMessage;
};