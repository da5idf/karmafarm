const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();
const { Product } = require('../../db/models');

// Verify Key
router.get(
    "/",
    asyncHandler(async (rec, res, next) => {
        const products = await Product.findAll();
        return res.send(products);
    })
)

module.exports = router;