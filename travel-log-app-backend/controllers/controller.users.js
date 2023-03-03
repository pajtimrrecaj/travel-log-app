const User = require('../models/model.users')
const Post = require('../models/model.posts')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { USER_ROLES } = require('../lib/constants')
const { sendVerificationEmail, sendPasswordResetEmail } = require('../lib/emails')


module.exports = {
    register: async (body) => {
        const { email, firstName, lastName, password } = body

        const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT))

        const user = await User.create({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashPassword
        })

        sendVerificationEmail(user)

        delete user._doc.password
        return user
    },

    login: async (body) => {
        const { email, password } = body
        const user = await User.findOne({ email }).exec()
        if (!user) {
            throw Error('Invalid user!')
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw Error('Incorrect password!')
        }

        if (!user.verified) {
            throw Error('Account not verified!')
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        return token
    },

    getMe: async (_id) => {
        const user = await User.findOne({ _id }).exec()
        const posts = await Post.find({ author: _id }, 'title description location createdAt').populate('location', 'placeName country').sort({ createdAt: -1 }).exec()
        const data = {
            profile: {
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
            posts: posts
        }
        console.log(posts)

        return data
    },

    verifyAccount: async (token) => {
        if (!token) {
            throw Error('Token not provided!')
        }
        const decoded = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET)
        const user = await User.findOne({ _id: decoded }).exec()
        if (!user) {
            throw Error('Invalid user!')
        }
        await User.findByIdAndUpdate(user._id, { verified: true }).exec()
        return true
    },

    requestResetPassword: async (body) => {
        const { email } = body
        const user = await User.findOne({ email }).exec()
        if (!user) {
            throw Error('Invalid user!')
        }
        sendPasswordResetEmail(user)
        return true
    },

    resetPassword: async (body) => {
        const { token, password } = body

        const decoded = jwt.verify(token, process.env.JWT_VERIFICATION_SECRET)
        const user = await User.findOne({ _id: decoded }).exec()
        if (!user) {
            throw Error('Invalid user!')
        }
        const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT))
        await User.findByIdAndUpdate(user._id, { password: hashPassword }).exec()
        return true

    },

    createAdmin: async () => {
        const user = await User.findOne({ role: USER_ROLES.ADMIN }).exec()

        const hashPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, parseInt(process.env.SALT))

        if (!user) {
            User.create({
                email: process.env.ADMIN_EMAIL,
                password: hashPassword,
                verified: true,
                firstName: 'ADMIN',
                lastName: 'ADMIN',
                role: USER_ROLES.ADMIN,
            })
        }
    },


}