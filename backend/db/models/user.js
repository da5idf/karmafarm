'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
      unique: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    farmer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        allScope: {
          attributes: {}
        },
      }
    });

  // Instance Method to return an obj with User information OK to save to JWT Token
  User.prototype.toSafeObject = function () {
    const { id, name, admin, farmer, key, email } = this;
    return { id, name, admin, farmer, key, email };
  };

  // Instance Method to validate password
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  // Static Method to get User by id
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  // Static Method to login a User
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('allScope').findOne({
      where: {
        email: credential
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  // Static method to sign up a User
  User.signup = async function ({ name, email, phoneNumber, admin, farmer, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      name,
      email,
      phoneNumber,
      admin,
      farmer,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function (models) {
    User.hasMany(models.Restaurant, { foreignKey: 'ownerId' })
    User.hasMany(models.Member, { foreignKey: 'userId' })
    User.hasMany(models.Product, { foreignKey: 'farmerId' })
    User.hasMany(models.Orders_Products, { foreignKey: 'userId' })

    const columnMapping = {
      through: "Member",
      otherKey: "restaurantId",
      foreignKey: "userId",
      as: "UsersRestaurants"
    }
    User.belongsToMany(models.Restaurant, columnMapping)
  };

  return User;
};