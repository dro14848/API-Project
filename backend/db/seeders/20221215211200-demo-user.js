'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Aramis',
        lastName: 'LonglasName',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'Sam',
        firstName: 'Uel',
        lastName: 'lastf',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Leandro',
        lastName: 'Figueiredo',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        firstName: 'Devin',
        lastName: 'Stovebob',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        firstName: 'Tim',
        lastName: 'Jim',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        firstName: 'Turner',
        lastName: 'Otto',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'demoUser@demo.io',
        username: 'Demo',
        firstName: 'Demo',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('demopass1')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4', 'FakeUser5', 'Demo'] }
    }, {});
  }
};