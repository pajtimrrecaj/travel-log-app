const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = mongoose.Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        description: { type: String },
        location: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Post', postSchema)