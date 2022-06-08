const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { User, Restaurant, Member } = require('../../db/models');

// Add Member
router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { userId, restaurantId } = req.body;

        // const user = await User.findOne({
        //     where: { id: userId }
        // })

        // const restaurant = await Restaurant.findOne({
        //     where: { id: restaurantId }
        // })

        // if (user && restaurant) {
        if (true) {
            const member = await Member.create({
                userId,
                restaurantId
            })
            return res.json({ member })
        }
    })
);

module.exports = router;