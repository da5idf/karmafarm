'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Products';
    return queryInterface.bulkInsert(options, [
      {
        name: 'Super Sugar Snap',
        imgUrl: 'https://karmafarm.s3.amazonaws.com/seeder/sugar_snap.jpeg',
        farm: 'Karma Farm',
        type: 'Peas',
        description: 'Very sweet and fresh',
        pricePerPound: 9.75,
        caseWeight: null,
        casePrice: null,
        active: true,
        farmerId: 1,
      },
      {
        name: 'Vroma Fava Bean',
        imgUrl: 'https://karmafarm.s3.amazonaws.com/seeder/vroma.jpeg',
        farm: 'Karma Farm',
        type: 'Fava Bean',
        description: 'Large, pale green fava bean with large seeds',
        pricePerPound: 6.50,
        caseWeight: null,
        casePrice: null,
        active: true,
        farmerId: 1,
      },
      {
        name: 'Corinto Cucumber',
        imgUrl: 'https://karmafarm.s3.amazonaws.com/seeder/corinto.jpeg',
        farm: 'Karma Farm',
        type: 'Cucumber',
        description: 'Hybrid cucumber with dark green skin. Classic slicing cucumber',
        pricePerPound: 2.60,
        caseWeight: null,
        casePrice: null,
        active: true,
        farmerId: 1,
      },
      {
        name: 'Katrina Cucumber',
        imgUrl: 'https://karmafarm.s3.amazonaws.com/seeder/katrina.jpeg',
        farm: 'Karma Farm',
        type: 'Cucumber',
        description: 'Smooth skin, classic cocktail cuke!',
        pricePerPound: 2.90,
        caseWeight: null,
        casePrice: null,
        active: true,
        farmerId: 1,
      },
      {
        name: 'Hakurei Turnip',
        imgUrl: 'https://karmafarm.s3.amazonaws.com/seeder/hakurei.jpeg',
        farm: 'Karma Farm',
        type: 'Turnip',
        description: 'Small, smooth, and white. Very nice raw because of their sweetness.',
        pricePerPound: 3.90,
        caseWeight: null,
        casePrice: null,
        active: true,
        farmerId: 1,
      },
      {
        name: 'Collard Greens',
        imgUrl: 'https://karmafarm.s3.amazonaws.com/seeder/flash.jpeg',
        farm: 'Karma Farm',
        type: 'Brassica',
        description: 'Big, hardy leaves',
        pricePerPound: 3.75,
        caseWeight: null,
        casePrice: null,
        active: true,
        farmerId: 1,
      },
      {
        name: 'Hinona Kabu',
        imgUrl: 'https://karmafarm.s3.amazonaws.com/seeder/hinonakabu.jpeg',
        farm: 'Karma Farm',
        type: 'Turnip',
        description: 'Unusual carrot shaped turnip. Usually about 6 - 8" long with a beautiful purple top.',
        pricePerPound: 3.90,
        caseWeight: null,
        casePrice: null,
        active: true,
        farmerId: 1,
      },
      {
        name: 'Murasaki Sweet Potato',
        imgUrl: 'https://karmafarm.s3.amazonaws.com/seeder/murasaki.jpeg',
        farm: 'Sassafras Creek',
        type: 'Potato',
        description: 'Japanese sweet potato: purple skin, white flesh',
        pricePerPound: 3.20,
        caseWeight: null,
        casePrice: null,
        active: true,
        farmerId: 1,
      },
      {
        name: 'Nebechan Spring Onion',
        imgUrl: 'https://karmafarm.s3.amazonaws.com/seeder/nebechan.jpeg',
        farm: 'Karma Farm',
        type: 'Onion',
        description: 'Japanese variety that has a sweeter more complex flavor but are smaller than average spring onions.',
        pricePerPound: 2.90,
        caseWeight: null,
        casePrice: null,
        active: true,
        farmerId: 1,
      },
      {
        name: 'Juicing Carrots',
        imgUrl: 'https://karmafarm.s3.amazonaws.com/seeder/carrots.jpeg',
        farm: 'Sassafras Creek',
        type: 'Carrots',
        description: 'Seconds: some imperfections but save flavor as always',
        pricePerPound: 1.90,
        caseWeight: null,
        casePrice: null,
        active: true,
        farmerId: 1,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Products';
    return queryInterface.bulkDelete(options);
  }
};
