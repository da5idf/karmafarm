const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { UpdateMessage, User_UpdateMessage } = require('../../db/models');
const { Op } = require('sequelize');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

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
    singleMulterUpload("image"),
    asyncHandler(async (req, res, next) => {
        const { text, userId } = req.body
        const imgUrl = await singlePublicFileUpload(req.file);

        console.log("***$*$*$**$*$*$**$*$**$", imgUrl);

        const newUpdate = await UpdateMessage.create({
            userId,
            text,
            imgUrl
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

        const records = await User_UpdateMessage.findAll({
            where: { userId: { [Op.not]: update.userId } }
        })

        records.forEach(async record => {
            record.read = false;
            await record.save();
        })

        res.send(update);
    })
)

router.delete(
    "/:updateId",
    asyncHandler(async (req, res, next) => {
        const { updateId } = req.params;

        const update = await UpdateMessage.findByPk(updateId);
        await update.destroy();

        // set all user's read columns to true so that the previous
        // update doesn't populate their screen on login.
        const records = await User_UpdateMessage.findAll()
        records.forEach(async record => {
            record.read = true;
            await record.save();
        })

        res.send(update);
    })
)

module.exports = router