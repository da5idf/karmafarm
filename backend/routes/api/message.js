const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Thread, Message } = require('../../db/models');

router.post(
    "/",
    asyncHandler(async (req, res, next) => {
        const { members, userId, text } = req.body

        const thread = await Thread.findOne({
            where: { members }
        })

        const message = await Message.create({
            threadId: thread.id,
            userId,
            text
        })

        // update the last message on this thread
        thread.last = message;
        await thread.save();

        // emmit new message to client side socket
        // dispatch from the socket to update the store.
        const io = req.app.get("socketio");
        io.emit("message:new", { message });
    })
)

module.exports = router;