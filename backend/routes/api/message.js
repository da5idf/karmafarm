const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Thread, Message } = require('../../db/models');

router.post(
    "/",
    asyncHandler(async (req, res, next) => {
        const { members, userId, text } = req.body

        let thread;
        thread = await Thread.findOne({
            where: { members }
        })

        if (!thread) {
            thread = await Thread.create({
                members
            })
        }

        const message = await Message.create({
            threadId: thread.id,
            userId,
            text
        })

        // update the last message on this thread
        // also done in the reducer
        thread.last = message.text;
        await thread.save();

        // find other user to key into that person's unread count
        // != for implicit type coercion
        const receiver = members.split("-").find(member => member != userId)

        // emmit new message to client side socket
        // dispatch from the socket to update the store.
        const io = req.app.get("socketio");
        io.emit("message:new", { message, members, receiver });
    })
)

router.patch(
    "/threads/:threadId",
    asyncHandler(async (req, res, next) => {
        const { threadId } = req.params
        const { userId } = req.body

        const thread = await Thread.findByPk(threadId, {
            include: Message
        })

        let readCount = 0;
        const updatedMessageIds = [];
        if (thread.Messages.length) {
            thread.Messages.forEach(message => {
                if (message.userId !== userId && message.read !== true) {
                    readCount++;
                    message.read = true;
                    saveMessage(message);
                    updatedMessageIds.push(message.id);
                }
            })
        }

        // not a socket event. Only want to dispatch and 
        // update store on this user's browser.
        res.send({
            updatedMessageIds,
            members: thread.members,
            userId,
            readCount
        });
    })
)

// it wouldn't let me await inside the if statement
// errors out that must be top lvl of function?
const saveMessage = async (message) => {
    await message.save();
}

module.exports = router;