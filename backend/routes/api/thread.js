const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Thread, Message, Sequelize } = require('../../db/models');
const { Op } = require('sequelize');

router.get(
    "/:userId",
    asyncHandler(async (req, res, next) => {
        const { userId } = req.params

        // only get threads that this user is member of
        const threads = await Thread.findAll({
            where: {
                members: {
                    [Op.like]: `%${userId}%`
                }
            },
            include: Message
        })

        let totalUnread = 0;
        threads.forEach(thread => {
            // != for implicit type coercion
            const otherUser = thread.members.split("-").find(member => member != userId)
            let count = 0;

            let messages = thread.Messages;
            messages.length && messages.forEach(message => {
                // != for string <=> number comparison
                if (message.userId != userId && !message.read) count++
            })
            thread.dataValues.unreadCounts = {
                [userId]: count,
                [otherUser]: undefined
            };
            totalUnread += count;
        })

        return res.send({ threads, totalUnread });
    })
)

module.exports = router