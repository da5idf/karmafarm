const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const keyRouter = require('./key.js');
const restaurantRouter = require('./restaurants.js');
const memberRouter = require('./members.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/key', keyRouter);
router.use('/restaurants', restaurantRouter);
router.use('./members', memberRouter);

module.exports = router;