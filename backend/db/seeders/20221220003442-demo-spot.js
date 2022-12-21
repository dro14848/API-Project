'use strict';

// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '5241 w hillsboro blv',
        city: 'Coconut Creek',
        state: 'Florida',
        country: 'USA',
        lat:  -47.76358,
        lng: -12.4727,
        name: 'New AP',
        description: 'what I miss the most',
        price: 1350,

      },
      {
        ownerId: 2,
        address: '215 SE 14th Pl',
        city: 'Deerfield Beach',
        state: 'Florida',
        country: 'USA',
        lat:  13.41234123,
        lng: -11.134443,
        name: 'House Leandro',
        description: 'Where dreams get shattered',
        price: 46,

      },
      {
        ownerId: 3,
        address: '1428 se 4th av',
        city: 'Deerfield Beach',
        state: 'Florida',
        country: 'USA',
        lat:  13.33242,
        lng: 28.321523,
        name: 'The other house',
        description: 'Where you can hide from the world',
        price: 34,

      }


    ], {})
  },
 

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
