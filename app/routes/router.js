const express = require('express')
const router = express.Router()

/* API routes */
router.use('/categorie', require('./api/categorieRoutes'))
router.use('/beer', require('./api/beerRoutes'))

router.use('/brewery', require('./api/breweryRoutes'))

module.exports = router
