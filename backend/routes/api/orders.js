const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Order, Restaurant, Orders_Products, Product, User } = require('../../db/models')

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const orders = await Order.findAll({
            include: [Restaurant, {
                model: Orders_Products,
                include: Product
            }],
            order: [['id', 'DESC']]
        });

        res.send(orders);
    })
)

router.get(
    '/:orderId',
    asyncHandler(async (req, res, next) => {
        const { orderId } = req.params
        const order = await Order.findByPk(orderId, {
            include: [
                { model: Restaurant },
                {
                    model: Orders_Products,
                    include: [Product, User]
                }
            ]
        })

        return res.send(order);
    })
)

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

        return res.send(newOrder);
    })
)

router.get(
    '/:orderId/orders_products',
    asyncHandler(async (req, res, next) => {
        const { orderId } = req.params;

        const records = await Orders_Products.findAll({
            where: {
                orderId,
            },
            include: [Product, User]

        })

        res.send(records)
    })
)

router.put(
    '/:orderId/submit/:submitted',
    asyncHandler(async (req, res, next) => {
        const { orderId, submitted } = req.params;
        const order = await Order.findByPk(orderId, {
            include: [
                { model: Restaurant },
                {
                    model: Orders_Products,
                    include: [Product, User]
                }
            ]
        })

        order.submitted = submitted;
        await order.save();

        return res.send(order)
    })
)

router.put(
    '/:orderId/delivery/',
    asyncHandler(async (req, res, next) => {
        const { orderId } = req.params;
        const { dateOfDelivery } = req.body;
        const order = await Order.findByPk(orderId, {
            include: [
                { model: Restaurant },
                {
                    model: Orders_Products,
                    include: [Product, User]
                }
            ]
        })

        order.dateOfDelivery = dateOfDelivery;
        await order.save();

        return res.send(order)
    })
)

router.delete(
    '/:orderId',
    asyncHandler(async (req, res, next) => {
        const { orderId } = req.params;
        console.log("#########################", orderId)

        const order = await Order.findByPk(orderId)

        // if (order) async(() => {
        //     // delete all product records for this order
        //     const orderProducts = await Orders_Products.findAll({
        //         where: { orderId }
        //     })
        //     orderProducts.forEach(record => async () => {
        //         await record.destroy();
        //     })

        //     // Delete all feedback records for this order
        //     const feedbackRecords = await Feedback.findAll({
        //         where: { orderId }
        //     })
        //     feedbackRecords.forEach(record => async () => {
        //         await record.destroy();
        //     })

        //     await order.destroy();
        // })()

        if (order) await order.destroy();

        res.send(orderId);
    })
)



module.exports = router;