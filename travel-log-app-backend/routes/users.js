const express = require('express')
const { validateUserToken } = require('../lib/tokenValidators')
const router = express.Router()
const postsController = require('../controllers/controller.posts')
const fieldValidators = require('../lib/fieldValidators')
const userController = require('../controllers/controller.users')
const { respond } = require('../lib/responder')



router.post('/create-post', fieldValidators.validate.createPost, fieldValidators.validationResult, async (req, res) => {
  try {
    const result = await postsController.createPost(req)
    return respond(res, result)
  } catch (err) {
    return respond(res, err.message, false)
  }
})

router.post('/delete-post', async (req, res) => {
  try {
    const result = await postsController.deletePost(req.body)
    return respond(res, result)
  } catch (err) {
    return respond(res, err.message, false)
  }
})

router.post('/edit-post', async (req, res) => {
  try {
    const result = await postsController.editPost(req.body)
    return respond(res, result)
  } catch (err) {
    return respond(res, err.message, false)
  }
})

router.get('/me', validateUserToken, async (req, res) => {
  try {
    const result = await userController.getMe(req.decoded)
    return respond(res, result)
  } catch (err) {
    return respond(res, err.message, false)
  }
})

router.post('/search', async (req, res) => {
  try {
    const results = await postsController.searchPost(req.body.query)
    console.log(results)
    return respond(res, results)
  } catch (err) {
    return respond(res, err.message, false)
  }
})

module.exports = router