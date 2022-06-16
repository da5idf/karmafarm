const express = require('express')
const asyncHandler = require('express-async-handler');

const { Feedback, Restaurant, User, Product, Order } = require('../../db/models')

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { feedback: { text, userId, restaurantId, orderId, productId } } = req.body;

        const feedback = await Feedback.create({
            text,
            userId,
            restaurantId,
            orderId,
            productId
        })

        res.send(feedback)
    })
)

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const feedback = await Feedback.findAll({
            include: [Restaurant, User, Product, Order]
        });

        res.send(feedback);
    })
)

module.exports = router;