const express = require('express')
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { User, Restaurant, Order, Member, Orders_Products, Product } = require('../../db/models');

// Validate restaurant sign up
const validateSignup = [
    check('name')
        .isLength({ min: 3 })
        .withMessage('Please provide a name with at least 3 characters.'),
    check('name')
        .isLength({ max: 20 })
        .withMessage('Please provide a name with at most 20 characters.'),
    check('address')
        .isLength({ min: 6 })
        .withMessage('Address must be 6 characters or more.'),
    check('address')
        .isLength({ max: 6 })
        .withMessage('Address must be less than 100 characters.'),
    check('restaurantNumber')
        .isLength(10)
        .withMessage('Please enter a 10-digit phone number'),
    handleValidationErrors
]


router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res, next) => {
        const { name, address, restaurantNumber, ownerId } = req.body;

        const restaurant = await Restaurant.scope('basic').findOne({
            where: {
                [Op.or]: {
                    address,
                    restaurantNumber
                }
            }
        })

        if (!restaurant) {
            const newRest = await Restaurant.create({
                name,
                address,
                restaurantNumber,
                ownerId
            });

            return res.json(newRest);

        } else {
            const err = new Error("Restaurant Error");
            err.status = 401;
            err.title = "New Restaurant submission failure";
            err.errors = ["Address and or number belong to another account."];
            return next(err);
        }
    })
);

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const restaurants = await Restaurant.findAll();
        return res.send(restaurants)
    })
)

router.get(
    '/:restaurantId',
    asyncHandler(async (req, res, next) => {
        const { restaurantId } = req.params
        const restaurant = await Restaurant.findByPk(restaurantId)

        return res.send(restaurant)
    })
)

router.get(
    '/:restaurantId/orders',
    asyncHandler(async (req, res, next) => {
        const { restaurantId } = req.params;
        const orders = await Order.findAll({
            where: { restaurantId },
            include: [
                {
                    model: Orders_Products,
                    include: Product
                }
            ],
            order: [['id', 'DESC']]
        })

        res.send(orders);
    })
)

router.get(
    '/:restaurantId/members',
    asyncHandler(async (req, res, next) => {
        const { restaurantId } = req.params;
        const members = await Restaurant.findByPk(restaurantId, {
            include: [
                {
                    model: Member,
                    include: User
                }
            ]
        })

        // This query returns each member
        // const members = await Member.findAll({
        //     where: { restaurantId },
        //     include: User
        // })

        res.send(members)
    })
)

module.exports = router;