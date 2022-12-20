'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [

      {
        spotId: 1,
        url: 'https://i.ytimg.com/vi/MARPpXuTi7k/maxresdefault.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://www.vibe.com/wp-content/uploads/2017/07/2-chainz-pink-trap-house-1499435421.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.homedit.com/wp-content/uploads/2021/11/Modern-Mansion.jpg',
        preview: true
      }

    ], {})
  },
 

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
