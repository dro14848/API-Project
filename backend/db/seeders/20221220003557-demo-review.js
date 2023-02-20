'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        userId: 2,
        review: 'place is exactly how it looks in the pictures. It’s absolutely beautiful!',
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: 'The house was quite lovely, and the yard was excellent.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Lovely place. The water view is amazing and the whole pool hot tub and backyard are amazing. Thanks!',
        stars: 5
      },
      {
        spotId: 4,
        userId: 5,
        review: 'Everything was beautiful the house was spacious. I love the view of the lake',
        stars: 5
      },
      {
        spotId: 5,
        userId: 6,
        review: 'Beautiful house and property with something fun to do and plenty of space for everyone!',
        stars: 5
      }, 
      {
        spotId: 6,
        userId: 1,
        review: 'Beautiful place! No disappointment!',
        stars: 5
      },
      {
        spotId:6,
        userId: 2,
        review: 'Worst website ever, do not waste your time here. Please pass me!',
        stars: 1
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Worst website ever, do not waste your time here. Please pass me!',
        stars: 1
      },
      {
        spotId: 4,
        userId: 4,
        review: 'Worst website ever, do not waste your time here. Please pass me!',
        stars: 1
      },
      {
        spotId: 3,
        userId: 5,
        review: 'Worst website ever, do not waste your time here. Please pass me!',
        stars: 1
      },
      {
        spotId: 2,
        userId: 6,
        review: 'Worst website ever, do not waste your time here. Please pass me!',
        stars: 1
      }, 
    ], {})
  },
 

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
