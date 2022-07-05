'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread',
    {
      members: {
        type: DataTypes.STRING,
        allowNull: false
      }
      // 1-2-13
    });
  Thread.associate = function (models) {
    // associations can be defined here
  };
  return Thread;
};