'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
<<<<<<< HEAD
        userId: '1',
=======
        userId: 1,
>>>>>>> dev
        startDate: "2022-1-11",
        endDate: "2022-1-12"
      },
      {
        spotId: 2,
<<<<<<< HEAD
        userId: '2',
=======
        userId: 2,
>>>>>>> dev
        startDate: "2022-1-11",
        endDate: "2022-1-12"
      },
      {
        spotId: 3,
<<<<<<< HEAD
        userId: '3',
=======
        userId: 3,
>>>>>>> dev
        startDate: "2022-1-11",
        endDate: "2022-1-12"
      }


    ], {})
  },
 

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
