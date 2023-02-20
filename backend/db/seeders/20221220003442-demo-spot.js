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
        name: 'Cozy Lakehouse Gem',
        description: 'You are invited to be our guest at the "Luxurious Private Vineyard Estate in Temecula Valley”.',
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
        name: 'A-Frame Cabin in the mountains',
        description: 'This property was professionally designed inside and out to create the ultimate experience for our guests.',
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
        name: 'The Forest Hideout',
        description: 'Palm trees rustle and waves gently lap just steps from your doorstep at this tropical manor.',
        price: 34,

      },
      {
        ownerId: 4,
        address: '123 seweqe',
        city: 'Boca Raton',
        state: 'Florida',
        country: 'USA',
        lat:  14.33242,
        lng: 26.321523,
        name: 'Bamboo House on the cliff (super safe, nothing to worry about!)',
        description: 'LOCATION - Location location location. My Studio is located in the Upper East neighborhood directly across from Ironside',
        price: 340,

      },
      {
        ownerId: 5,
        address: '231 eqweqe',
        city: 'Miramar',
        state: 'Florida',
        country: 'USA',
        lat:  24.33242,
        lng: 36.321523,
        name: 'Sandy Beach Estate',
        description: "This tiny home is located on the best lot on the property!.",
        price: 34,

      },
      {
        ownerId: 6,
        address: '44234 rwew',
        city: 'Cape Coral',
        state: 'Florida',
        country: 'USA',
        lat:  54.33242,
        lng: 54.321523,
        name: 'WHY NOT A CASTLE?',
        description: 'Welcome to our A-frame cabin, nestled into the start of a small pine forest.',
        price: 34,

      }
    ], {})
  },
 

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
