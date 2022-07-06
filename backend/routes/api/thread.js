const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { Thread, Message } = require('../../db/models');

router.get(
    "/:members/messages",
    asyncHandler(async (req, res, next) => {
        const { members } = req.params

        // returns [thread, boolean] where bool = true if created
        // important for next where criteria.
        let thread = await Thread.findOne({
            where: { members }
        })

        if (!thread) thread = await Thread.create({ members })

        const messages = await Message.findAll({
            where: { threadId: thread.id }
        })

        res.send(messages);
    })
)

router.post(
    "/",
    asyncHandler(async (req, res, next) => {
        const { members } = req.body

        const thread = await Thread.create({
            members
        })

        if (thread) {
            return res.send(thread);
        }
    })
)

module.exports = router