const mongoose = require('mongoose')


const placeSchema = mongoose.Schema(
    {
        placeName: { type: String, required: true },
        country: { type: String, required: true }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Place', placeSchema)