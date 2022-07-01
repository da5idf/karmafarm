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
    '/:orderId/paid/:paid',
    asyncHandler(async (req, res, next) => {
        const { orderId, paid } = req.params;
        const order = await Order.findByPk(orderId, {
            include: [
                { model: Restaurant },
                {
                    model: Orders_Products,
                    include: [Product, User]
                }
            ]
        })

        order.paid = paid;
        await order.save();

        return res.send(order)
    })
)

router.put(
    '/:orderId/delivery',
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

router.put(
    '/:orderId/delivery/:delivered',
    asyncHandler(async (req, res, next) => {
        const { orderId, delivered } = req.params;
        const order = await Order.findByPk(orderId, {
            include: [
                { model: Restaurant },
                {
                    model: Orders_Products,
                    include: [Product, User]
                }
            ]
        })

        order.delivered = delivered;
        await order.save();

        return res.send(order)
    })
)

router.put(
    '/:orderId/reopen',
    asyncHandler(async (req, res, next) => {
        const { orderId } = req.params;
        const { submitted, dateOfDelivery } = req.body;
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
        order.dateOfDelivery = dateOfDelivery;
        await order.save();

        return res.send(order)
    })
)

router.delete(
    '/:orderId',
    asyncHandler(async (req, res, next) => {
        const { orderId } = req.params;

        const order = await Order.findByPk(orderId)

        if (order) await order.destroy();

        res.send(orderId);
    })
)



module.exports = router;