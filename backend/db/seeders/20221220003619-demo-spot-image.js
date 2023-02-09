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
        url: 'https://a0.muscache.com/im/pictures/4f70b681-a792-4530-8c52-f2a8d262942d.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 1,
        url:'https://a0.muscache.com/im/pictures/miso/Hosting-43629767/original/ec85ccc0-281c-44fc-a061-bc1e87ea0081.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url:'https://a0.muscache.com/im/pictures/45a3aa2b-ce00-4068-9ebe-9f83ca281fe4.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 1,
        url:'https://a0.muscache.com/im/pictures/f474dfbe-557a-4d07-8d6e-76aba506b5a6.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/f192135e-4df8-4d86-9cda-8e4c72fc5d93.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/38920ae7-dbbf-4012-a222-5990dbc73dc9.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/442171aa-c5cf-402d-a4e5-689a6e4da754.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/1ba592f8-84ed-40c4-ac2e-789180e794c7.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50165906/original/b7f5759c-a603-42cf-8031-543120ba21e2.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/f8a1418d-e234-48f4-b856-fcecd1e5b41b.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/a0b22251-7bbd-45d4-8881-cb496a8b3f62.jpg?',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/7dba46c6-9a9d-45a0-8822-e79d14f1b7fc.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/bd718089-8ef3-4875-9904-a3855ec6b151.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/e3b60e55-e95f-45c9-8a32-50db5c050ca1.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29459696/original/d13b86bf-4f1c-43f0-a44e-8a9edfda26f1.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29459696/original/f257ffe4-a496-4d61-a155-2ea25584bfce.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29459696/original/ccfafa34-28c9-4e08-ae9e-d98abb7e13b9.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/49ebbcc7-75d4-4681-8e31-1b9a1480f695.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29459696/original/f2e5cacb-3cc4-4569-83a5-84888e34c834.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/807af64a-c3ba-4075-9b76-e1f09531c974.jpg?im_w=960',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/ef9ae79b-f360-4a31-adf1-9eb4edede987.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/95775f86-8ef8-4d59-bd48-b8f4c93842a4.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/b8ab02bf-4688-48c5-9a42-1bdab868088e.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/10d23cb8-d30a-4256-abdc-be2b14824219.jpg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-2328455/original/a4506c8c-70d8-4016-bc57-d64abbf2702d.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-2328455/original/ee35077c-591c-42f8-ac4c-4e1d1f7e11ae.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-2328455/original/35d0dc4e-cc9b-4d20-814f-efd42760b81c.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-2328455/original/40d9f3ac-7105-4436-9816-69e608127d23.jpeg?im_w=720',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-2328455/original/d9f84fca-cdd4-49cc-b25c-0cda22f20a59.jpeg?im_w=720',
        preview: false
      },
      // {
      //   spotId: ,
      //   url: '',
      //   preview: false
      // },

    ], {})
  },
 

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
