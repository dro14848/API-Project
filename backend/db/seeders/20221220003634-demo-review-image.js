'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://www.vibe.com/wp-content/uploads/2017/07/2-chainz-pink-trap-house-1499435421.jpg'
      },
      {
        reviewId: 2,
        url: 'https://cdn.homedit.com/wp-content/uploads/2021/11/Modern-Mansion.jpg'
      },
      {
        reviewId: 3,
        url: 'https://i.ytimg.com/vi/MARPpXuTi7k/maxresdefault.jpg'
      },


    ], {})
  },
 

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
