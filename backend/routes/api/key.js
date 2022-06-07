const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

// Login Validations
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Verify Key
router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        const { key } = req.body;

        const user = await User.findOne({
            where: { key }
        })

        if (user) {
            console.log(user.name);
            return res.json({ message: "success" })
        } else {
            const err = new Error("Key match failure");
            err.status = 401;
            err.title = "Key submission failed";
            err.errors = ["The key you provided does not match any team"];
            return next(err);
        }
    }
    ));

module.exports = router;