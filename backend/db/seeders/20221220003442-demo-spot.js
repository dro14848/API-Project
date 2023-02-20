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
        description: 'You are invited to be our guest at the "Luxurious Private Vineyard Estate in Temecula Valley”. Come and enjoy one of the largest most accommodating properties in Temecula Valley, Situated on 5 acres, this 8 bedroom 6.5 bath vineyard estate can accommodate your group with ease. Bordered with a picturesque 1 acre vineyard and half acre 75+ treed orchard this operating winery provides privacy and peace during your stay.',
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
        description: 'This property was professionally designed inside and out to create the ultimate experience for our guests. The entertaining backyard provides a brick oven pizza, outdoor kitchen, pool, spa, basketball court, tennis court, and recently added outdoor games including custom 9 hole mini golf course, bocce ball, horse shoes, and shuffleboard. The interior provides an equal amount of entertainment and luxury with a billiard and arcade room, 3 fireplaces, and a top of the line custom made bar.',
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
        description: 'Palm trees rustle and waves gently lap just steps from your doorstep at this tropical manor. A trail of tiles leads through the manicured yard to the sugary shore. Take a plunge in the capacious pool or try snorkelling in the crystal-clear Caribbean Sea. Dinner can be savoured al fresco on the terrace as the sunset ignites the horizon. Why not try kayaking, paddleboarding, or a local excursion?',
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
        name: 'Bamboo House',
        description: 'LOCATION - Location location location. My Studio is located in the Upper East neighborhood directly across from Ironside ( A Sustainable Super Block Community); Situated just blocks away from the hip Mimo district and a short drive to Wynwood, El Portal, Little Haiti, and Miami Shores. Explore the Design District, Downtown Miami, and the beautiful beaches all within a 10-15 minute drive.',
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
        description: "This tiny home is located on the best lot on the property! Gorgeous lakefront view with a wide, green field right in front of the house. As you walk into the house you will be stunned with the impressive floor-to-ceiling tile work and beautiful professional decorations! This house features two sleeping lofts and a sofa couch to accommodate up to 4 guests. The Universal is the perfect tiny home experience for the whole family.",
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
        name: 'Cape Coral Mansion',
        description: 'Welcome to our A-frame cabin, nestled into the start of a small pine forest. It’s complete with two cots, a hinged wall/awning, firepit, hammock, and elevated spaces to eat. Just bring your sleeping bag and other camp gear that helps you feel cozy and at home in the woodslands.',
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
