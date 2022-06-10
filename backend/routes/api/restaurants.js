const express = require('express')
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { User, Restaurant, Orders, Member } = require('../../db/models');

// Validate restaurant sign up
const validateSignup = [
    check('address')
]


router.post(
    '/new',
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
        const orders = await Orders.findAll({
            where: { restaurantId }
        })

        // console.log(orders);
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