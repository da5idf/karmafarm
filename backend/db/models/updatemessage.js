'use strict';
module.exports = (sequelize, DataTypes) => {
  const UpdateMessage = sequelize.define('UpdateMessage', {
    userId: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT,
  }, {});
  UpdateMessage.associate = function (models) {
    // associations can be defined here
  };
  return UpdateMessage;
};