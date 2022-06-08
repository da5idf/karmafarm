const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { User, Restaurant } = require('../../db/models');

// Verify Key
router.post(
    '/validate',
    asyncHandler(async (req, res, next) => {
        const { key } = req.body;

        const user = await User.findOne({
            where: { key }
        })

        if (user) {
            const restaurant = await Restaurant.scope('basic').findOne({
                where: { ownerId: user.id }
            })
            return res.json(restaurant)

        } else {
            const err = new Error("Key match failure");
            err.status = 401;
            err.title = "Key submission failed";
            err.errors = ["The key you provided does not match any team's key"];
            return next(err);
        }
    }
    ));

module.exports = router;