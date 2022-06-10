const express = require('express');
const asyncHandler = require('express-async-handler');

const { Orders_Products } = require('../../db/models');

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { orderId, productId, userId, weight } = req.body;
        const order_product = await Orders_Products.create({
            orderId,
            productId,
            userId,
            weight,
        })

        console.log(order_product)

        res.send(order_product)
    })
)

router.delete(
    '/:recordId',
    asyncHandler(async (req, res, next) => {
        const { recordId } = req.params;
        const record = await Orders_Products.findByPk(recordId);

        record.destroy();

        return res.send(record)
    })
)

module.exports = router