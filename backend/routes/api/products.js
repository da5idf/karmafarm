const express = require('express')
const asyncHandler = require('express-async-handler');

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
    asyncHandler(async (req, res, next) => {
        const { product } = req.body

        const newProduct = await Product.create(product)
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