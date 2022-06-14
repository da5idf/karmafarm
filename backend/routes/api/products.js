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
    asyncHandler(async (req, res, next) => {
        const { productId } = req.params
        const { product } = req.body

        const editProduct = await Product.findByPk(productId)

        for (let key in product) {
            if (product[key] != editProduct[key]) {
                console.log(product[key], editProduct[key])
                editProduct[key] = product[key];
            }
        }

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