'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Jon Shaw',
        email: 'jon@user.io',
        admin: true,
        farmer: true,
        key: 'k1k3naz92',
        hashedPassword: bcrypt.hashSync('password'),
        phoneNumber: 123456789,
      },
      {
        name: 'Jeremy Long',
        email: 'jeremy@user.io',
        admin: true,
        farmer: false,
        key: 'k1k3naz91',
        hashedPassword: bcrypt.hashSync('password2'),
        phoneNumber: 123456788,
      },
      {
        name: 'Scott Bakon',
        email: 'scott@user.io',
        admin: true,
        key: 'k123naz91',
        farmer: false,
        hashedPassword: bcrypt.hashSync('password3'),
        phoneNumber: 123456789,
      },
      {
        name: 'Kai Lineman',
        email: 'kai@user.io',
        admin: false,
        farmer: false,
        hashedPassword: bcrypt.hashSync('password3'),
        phoneNumber: 123456789,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', null, {});
  }
};