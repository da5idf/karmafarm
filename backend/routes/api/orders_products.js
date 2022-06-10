const express = require('express');
const asyncHandler = require('express-async-handler');

const { Orders_Products, Product, Order, Restaurant, User } = require('../../db/models');

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { orderId, productId, userId, weight } = req.body;

        // make new record
        await Orders_Products.create({
            orderId,
            productId,
            userId,
            weight,
        })

        // return the order with updated product records
        const order = await Order.findByPk(orderId, {
            include: [
                { model: Restaurant },
                {
                    model: Orders_Products,
                    include: [Product, User]
                }
            ]
        })

        res.send(order)
    })
)

router.delete(
    '/:recordId',
    asyncHandler(async (req, res, next) => {
        const { recordId } = req.params;
        const record = await Orders_Products.findByPk(recordId);

        await record.destroy();

        const order = await Order.findByPk(record.orderId, {
            include: [
                { model: Restaurant },
                {
                    model: Orders_Products,
                    include: [Product, User]
                }
            ]
        })

        return res.send(order)
    })
)

module.exports = router