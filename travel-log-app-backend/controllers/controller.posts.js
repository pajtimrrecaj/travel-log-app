const Post = require('../models/model.posts')
const User = require('../models/model.users')
const Place = require('../models/model.places')
const jwt = require('jsonwebtoken')

module.exports = {
    createPost: async (req) => {
        console.log(req.body.images)
        const { token, title, description, location } = req.body
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded }).exec()
        if (!user) {
            throw Error('Invalid user!')
        }

        const place = await Place.findOne({ _id: location }).exec()

        const post = await Post.create({
            author: user._id,
            title: title,
            description: description,
            location: place,
        })
        return true
    },
    deletePost: async (_id) => {

        const post = await Post.findByIdAndDelete(_id).exec()
        return post

    },
    editPost: async (body) => {

        const { post, title, description, location } = body
        const updatedPost = await Post.findById(post, 'title description location').exec()
        updatedPost.title = title
        updatedPost.description = description
        updatedPost.location = location
        await updatedPost.save()
        return updatedPost

    },
    searchPost: async (query) => {
        const results = await Post.find({ title: { $regex: `${query}`, $options: 'i' } }, 'title description createdAt').populate('author', 'firstName lastName').exec()
        return results
    }

}