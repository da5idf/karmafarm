const express = require('express')
const asyncHandler = require('express-async-handler');

const { Feedback } = require('../../db/models')

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { feedback: { text, userId, restaurantId, orderId, productId } } = req.body;

        console.log(text, userId, restaurantId, orderId, productId)

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

module.exports = router;