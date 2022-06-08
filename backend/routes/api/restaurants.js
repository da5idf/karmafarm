const express = require('express')
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { User, Restaurant } = require('../../db/models');

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
    }
    ));

module.exports = router;