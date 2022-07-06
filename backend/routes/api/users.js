const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Op } = require("sequelize");

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Restaurant, Member } = require('../../db/models');

const router = express.Router();

// Validate sign up
const validateSignup = [
    check('name')
        .isLength({ min: 4 })
        .withMessage('Please provide a name with at least 4 characters.'),
    check('name')
        .isLength({ max: 20 })
        .withMessage('Please provide a name with at most 20 characters.'),
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('email')
        .isLength({ max: 100 })
        .withMessage('Please provide an email with at most 100 characters.'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('password')
        .isLength({ max: 63 })
        .withMessage('Password must be less than 64 characters.'),
    check('phoneNumber')
        .isLength(10)
        .withMessage('Please enter a 10-digit phone number'),
    handleValidationErrors
];

router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { name, email, phoneNumber, admin, farmer, key, password } = req.body;
        const user = await User.signup({ name, email, phoneNumber, admin, farmer, key, password })

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
            include: [
                {
                    model: Member,
                    include: Restaurant
                }
            ]
        })

        if (user.Members.length) {
            return res.send(user.Members[0].Restaurant)
        } else {
            return (res.send({ response: false }))
        }

    })
)

router.get('/:userId/chat',
    asyncHandler(async (req, res) => {
        const { userId } = req.params;

        // currently only able to chat with farmers.
        // can change to farmers + staff of same restaurant in future
        const sessionUser = await User.findByPk(userId);

        let users;
        if (sessionUser.farmer) {
            users = await User.findAll();
        }
        else {
            users = await User.findAll({
                where: {
                    farmer: true
                }
            })
        }

        if (users.length) {
            return res.send(users)
        } else {
            return (res.send({ response: false }))
        }

    })
)


module.exports = router;