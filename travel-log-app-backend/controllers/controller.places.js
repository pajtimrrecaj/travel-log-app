const Place = require('../models/model.places')
module.exports = {
    addPlace: async (body) => {
        const { placeName, country } = body

        const place = await Place.create({
            placeName: placeName,
            country: country
        })
        return true
    },
    getPlaces: async () => {
        const results = await Place.find({}, 'placeName country').exec()
        return results
    }
}