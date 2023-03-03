const express = require('express')
const router = express.Router()
const { validateUserToken, isAdmin } = require('../lib/tokenValidators')
const { respond } = require('../lib/responder')
const fieldValidators = require('../lib/fieldValidators')
const placeController = require('../controllers/controller.places')

router.post('/add-place', validateUserToken, isAdmin, fieldValidators.validate.addPlace, fieldValidators.validationResult, async (req, res) => {
    try {
        const result = await placeController.addPlace(req.body)
        return respond(res, result)
    } catch (err) {
        return respond(res, err.message, false)
    }
})


router.get('/get-places', async (req, res) => {
    try {
        const result = await placeController.getPlaces(req.body)
        return respond(res, result)
    } catch (err) {
        return respond(res, err.message, false)
    }
})

module.exports = router