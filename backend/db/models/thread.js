'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread',
    {
      members: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last: {
        type: DataTypes.STRING
      }
    });
  Thread.associate = function (models) {
    Thread.hasMany(models.Message, { foreignKey: 'threadId' })
  };
  return Thread;
};