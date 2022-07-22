const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { UpdateMessage, User_UpdateMessage } = require('../../db/models');
const { Op } = require('sequelize');

router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        const messages = await UpdateMessage.findAll({
            order: [["id", "DESC"]]
        });

        res.send(messages);
    })
)

router.post(
    "/",
    asyncHandler(async (req, res, next) => {
        const { text, userId } = req.body

        const newUpdate = await UpdateMessage.create({
            text
        })

        const records = await User_UpdateMessage.findAll({
            where: { userId: { [Op.not]: userId } }
        })

        records.forEach(async record => {
            record.read = false;
            await record.save();
        })

        return res.send(newUpdate);
    })
)

router.patch(
    "/:updateId",
    asyncHandler(async (req, res, next) => {
        const { updateId } = req.params;
        const { text } = req.body;

        const update = await UpdateMessage.findByPk(updateId);
        update.text = text;
        await update.save();

        res.send(update);
    })
)

module.exports = router