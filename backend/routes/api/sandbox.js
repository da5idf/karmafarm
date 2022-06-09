const { User, Restaurant, Member } = require('../../db/models');

async function find() {
    const restaurants = await User.findAll()
    // console.log(restaurants);
}

find();