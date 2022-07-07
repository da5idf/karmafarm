const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Thread, Message } = require('../../db/models');

router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        const threads = await Thread.findAll({
            include: Message
        })

        return res.send(threads);
    })
)

// router.get(
//     "/:members/messages",
//     asyncHandler(async (req, res, next) => {
//         const { members } = req.params

//         // returns [thread, boolean] where bool = true if created
//         // important for next where criteria.
//         let thread = await Thread.findOne({
//             where: { members }
//         })

//         if (!thread) thread = await Thread.create({ members })

//         const messages = await Message.findAll({
//             where: { threadId: thread.id }
//         })

//         return res.send(messages);
//     })
// )

// router.post(
//     "/",
//     asyncHandler(async (req, res, next) => {
//         const { members } = req.body

//         const thread = await Thread.create({
//             members
//         })

//         if (thread) {
//             return res.send(thread);
//         }
//     })
// )

module.exports = router