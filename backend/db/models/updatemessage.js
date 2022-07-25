'use strict';
module.exports = (sequelize, DataTypes) => {
  const UpdateMessage = sequelize.define('UpdateMessage', {
    text: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  UpdateMessage.associate = function (models) {
    // associations can be defined here
  };
  return UpdateMessage;
};