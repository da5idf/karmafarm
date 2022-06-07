const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const keyRouter = require('./key.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/validatekey', keyRouter);

module.exports = router;