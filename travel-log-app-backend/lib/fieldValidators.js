const { check, validationResult } = require('express-validator')

const User = require('../models/model.users')

module.exports = {
    validate: {
        register: [
            check('email', 'email is not valid').isEmail(),
            check('email', 'email field must not be empty').notEmpty(),
            check('email').custom(async (value) => {
                const user = await User.findOne({ email: value }).exec()
                if (user) {
                    return 'Email already in use'
                }
            }),
            check('password', 'password must have a minimum of 6 characters').isLength({ min: 6 }),
            check('password', 'password must not be empty').notEmpty(),
            check('firstName', 'first name cannot be empty').notEmpty(),
            check('lastName', 'first name cannot be empty').notEmpty(),
        ],
        login: [
            check('email', 'email is not valid').isEmail(),
            check('email', 'email field must not be empty').notEmpty(),
            check('password', 'password must not be empty').notEmpty(),
        ],
        passwordResetEmail: [
            check('email', 'email is not valid').isEmail(),
            check('email', 'email field must not be empty').notEmpty(),
        ],
        resetPassword: [
            check('token', 'token field must not be empty').notEmpty(),
            check('token', 'token field must be a jwt token').isJWT(),
            check('password', 'password must have a minimum of 6 characters').isLength({ min: 6 }),
            check('password', 'password must not be empty').notEmpty(),
        ],
        createPost: [
            check('title', 'title field must not be empty').notEmpty(),
            check('description', 'description field must not be empty').notEmpty(),
            // check('location', 'location field must not be empty').notEmpty(),

        ],
        addPlace: [
            check('placeName', 'place name must not be empty').notEmpty(),
            check('country', 'country must not be empty').notEmpty()
        ]

    },
    validationResult: (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            next()
        }
    }
}