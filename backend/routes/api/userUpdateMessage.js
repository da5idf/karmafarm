const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { UpdateMessage, User_UpdateMessage } = require('../../db/models');

router.get(
    "/:userId",
    asyncHandler(async (req, res, next) => {
        const { userId } = req.params
        // userId === User_UpdateMessage.id by design
        const record = await User_UpdateMessage.findByPk(userId);

        const messages = await UpdateMessage.findAll({
            order: [["id", "DESC"]]
        });

        res.send({
            read: record.read,
            text: messages[0] ? messages[0].text : ""
        });
    })
)

router.patch(
    "/:userId",
    asyncHandler(async (req, res, next) => {
        const { userId } = req.params;

        // userId === User_UpdateMessage.id by design
        const record = await User_UpdateMessage.findByPk(userId)
        record.read = true;
        await record.save();

        res.send(record)
    })
)

module.exports = router;