const express = require('express')
const asyncHandler = require('express-async-handler');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')

const router = express.Router();
const { Product } = require('../../db/models');

// Verify Key
router.get(
    "/",
    asyncHandler(async (rec, res, next) => {
        const products = await Product.findAll({
            order: [["updatedAt", "DESC"]]
        });
        return res.send(products);
    })
)

router.post(
    "/",
    singleMulterUpload("image"),
    asyncHandler(async (req, res, next) => {
        const {
            name,
            description,
            pricePerPound,
            active,
            type,
            farmerId,
        } = req.body

        const imgUrl = await singlePublicFileUpload(req.file)

        const newProduct = await Product.create({
            name,
            description,
            pricePerPound,
            active,
            type,
            farmerId,
            imgUrl,
        })

        res.send(newProduct)
    })
)

router.put(
    "/:productId",
    singleMulterUpload("image"),
    asyncHandler(async (req, res, next) => {
        const { productId } = req.params
        const {
            name,
            description,
            pricePerPound,
            active,
            type,
            farmerId,
        } = req.body

        const editProduct = await Product.findByPk(productId)

        let imgUrl
        try {
            imgUrl = await singlePublicFileUpload(req.file)
            editProduct.imgUrl = imgUrl
        } catch (e) {

        }

        if (name) editProduct.name = name;
        if (description) editProduct.description = description;
        if (pricePerPound) editProduct.pricePerPound = pricePerPound;
        if (active) editProduct.active = active;
        if (type) editProduct.type = type;
        if (farmerId) editProduct.farmerId = farmerId;

        await editProduct.save();
        res.send(editProduct)
    })
)

router.delete(
    "/:productId",
    asyncHandler(async (req, res, next) => {
        const { productId } = req.params;

        const product = await Product.findByPk(productId);

        if (product) {
            await product.destroy();

            res.send({ message: "successfully deleted" })
        }
    })
)

module.exports = router;