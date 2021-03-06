const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const keyRouter = require('./key.js');
const restaurantRouter = require('./restaurants.js');
const memberRouter = require('./members.js');
const productRouter = require('./products.js')
const ordersRouter = require('./orders.js');
const order_productsRouter = require('./orders_products.js')
const feedbackRouter = require('./feedback.js');
const threadRouter = require('./thread.js');
const messageRouter = require('./message.js');
const updateMessageRouter = require('./updateMessage.js');
const userUpdateMessageRouter = require('./userUpdateMessage')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/key', keyRouter);
router.use('/restaurants', restaurantRouter);
router.use('/members', memberRouter);
router.use('/products', productRouter);
router.use('/orders', ordersRouter);
router.use('/orders_products', order_productsRouter);
router.use('/feedback', feedbackRouter);
router.use('/threads', threadRouter);
router.use('/messages', messageRouter);
router.use('/updateMessage', updateMessageRouter);
router.use('/user_updatemessage', userUpdateMessageRouter);

module.exports = router;