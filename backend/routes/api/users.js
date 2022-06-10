const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Restaurant, Member } = require('../../db/models');

const router = express.Router();

// Validate sign up
const validateSignup = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('name')
        .isLength({ min: 4 })
        .withMessage('Please provide a name with at least 4 characters.'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('phoneNumber')
        .isLength(10)
        .withMessage('Please enter a 10-digit phone number'),
    handleValidationErrors
];

router.post('/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { name, email, phoneNumber, admin, farmer, password } = req.body;

        const user = await User.signup({ name, email, phoneNumber, admin, farmer, password })

        if (user) {
            setTokenCookie(res, user)
            return res.send({ user });
        }
    })
);

router.get('/:userId/restaurants',
    asyncHandler(async (req, res) => {
        const { userId } = req.params;
        const user = await User.findByPk(userId, {
            include: Restaurant
        })

        return res.send(user.Restaurants)
    })
)


module.exports = router;