'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    threadId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Message.associate = function (models) {
    Message.belongsTo(models.Thread, { foreignKey: "threadId" })
    Message.belongsTo(models.User, { foreignKey: "userId" })
  };
  return Message;
};