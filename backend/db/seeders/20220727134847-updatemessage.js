'use strict';
const now = new Date().getTime()
const day = 24 * 60 * 60 * 1000
const oneDayAgo = new Date(now - day)
const oneWeekAgo = new Date(now - 7 * day)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UpdateMessages', [
      {
        text: `Dear Friends\n\nIts been a rough week - we had a "derecho" storm, which means sustained winds north of 58MPH come directly through our area on Tuesday afternoon and its a disaster area.  Our power has been out for almost 3 days and we don't have any idea when it will return.  Our backup generator failed so we have no power to the farming operation - sorry to cry so much!\n\nOn the bright side we had no outdoor crop or hoop house damage and we have a water source so we're limping along.  Putting this all in perspective - our availability for some things is questionable.  The indoor vertical farm hasn't had any light since Tuesday so anything on the list below with an asterisk means we may not have it - won't know until power is restored.  We're relying on our hoop houses and other farms for the most part for now.\n\nThanks for your patience in case we drop a ball or 2 but we're trudging through some chaos.\nBy the way we have apricots coming for this week only...........!\n\nBest\nJon & Crew`,
        userId: 1,
        imgUrl: 'https://karmafarm.s3.amazonaws.com/seeder/updatemessage1.jpeg',
        createdAt: oneWeekAgo,
        updatedAt: oneWeekAgo
      },
      {
        text: `Dear Friends\n\nNot too much new this week - a couple of herbs, black raspberries, etc. but the picture above will be a reality in a week or 2 at most.\n\nWe're ready for the tomato, pepper, and eggplant explosion - not to mention peaches and hope you're ready too!\n\nPlease let us know how we can help you.\n\nBest\nJon & Crew`,
        userId: 1,
        imgUrl: 'https://karmafarm.s3.amazonaws.com/seeder/updatemessage2.jpeg',
        createdAt: oneDayAgo,
        updatedAt: oneDayAgo
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UpdateMessages', null, {});
  }
};
