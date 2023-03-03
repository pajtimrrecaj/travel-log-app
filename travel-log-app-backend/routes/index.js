const express = require('express');
const router = express.Router();
const { respond } = require('../lib/responder')
const { version, name } = require('../package.json')

router.get('/', function (req, res, next) {
    return respond(res, {
        name,
        version,
    })
})

router.get('/test', async (req, res) => {
    return respond(res, 'test')
})
module.exports = router;
