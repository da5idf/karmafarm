'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UpdateMessages', [
      {
        text: `Dear Friends\n
        Its been a rough week - we had a "derecho" storm, which means sustained winds north of 58MPH come directly through our area on Tuesday afternoon and its a disaster area.  Our power has been out for almost 3 days and we don't have any idea when it will return.  Our backup generator failed so we have no power to the farming operation - sorry to cry so much!\n
        On the bright side we had no outdoor crop or hoop house damage and we have a water source so we're limping along.  Putting this all in perspective - our availability for some things is questionable.  The indoor vertical farm hasn't had any light since Tuesday so anything on the list below with an asterisk means we may not have it - won't know until power is restored.  We're relying on our hoop houses and other farms for the most part for now.\n
        Thanks for your patience in case we drop a ball or 2 but we're trudging through some chaos.\n
        By the way we have apricots coming for this week only...........!\n
        Best\n
        Jon & Crew`,
        userId: 1
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UpdateMessages', null, {});
  }
};
