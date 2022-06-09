const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Order, Restaurant } = require('../../db/models')

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { restaurantId, submitted, delivered, paid } = req.body;
        const create = await Order.create({
            restaurantId,
            submitted,
            delivered,
            paid
        })

        const newOrder = await Order.findByPk(create.id, {
            include: Restaurant
        })

        // console.log("#########################")
        // console.log("", newOrder)
        // console.log("#########################")

        return res.send(newOrder);
    })
)

module.exports = router;