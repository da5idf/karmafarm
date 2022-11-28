'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Jon Shaw',
        email: 'jon@user.io',
        admin: true,
        farmer: true,
        key: 'k1k3naz92',
        hashedPassword: bcrypt.hashSync('password'),
        phoneNumber: "1111111111",
      },
      {
        name: 'Jackie Miller',
        email: 'jackie@user.io',
        admin: false,
        farmer: true,
        key: 'k1k3naz92',
        hashedPassword: bcrypt.hashSync('password1'),
        phoneNumber: "1231111234",
      },
      {
        name: 'Jeremy Long',
        email: 'jeremy@user.io',
        admin: true,
        farmer: false,
        key: 'k1k3naz91',
        hashedPassword: bcrypt.hashSync('password2'),
        phoneNumber: "1234567890",
      },
      {
        name: 'Scott Bakon',
        email: 'scott@user.io',
        admin: true,
        key: 'k123naz91',
        farmer: false,
        hashedPassword: bcrypt.hashSync('password3'),
        phoneNumber: "1234567891",
      },
      {
        name: 'Kai Lineman',
        email: 'kai@user.io',
        admin: false,
        farmer: false,
        hashedPassword: bcrypt.hashSync('password4'),
        phoneNumber: "1234567892",
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users'
    return queryInterface.bulkDelete(options);
  }
};