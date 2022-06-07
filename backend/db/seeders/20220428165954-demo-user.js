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
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        name: 'FakeUser1',
        email: 'user1@user.io',
        admin: true,
        farmer: false,
        key: 'na7vkjz80',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        name: 'FakeUser2',
        email: 'user2@user.io',
        admin: false,
        farmer: false,
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};