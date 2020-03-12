const express = require('express')
const router = express.Router()

const { checkSchema } = require('express-validator');

const BeerController = require('../../controller/beerController')
const beerController = new BeerController()

const searchBeer = require('./schemas/SearchBeer')

router.get('/', function (req, res) {
  beerController.findAll(res)
})

router.get('/search', checkSchema(searchBeer), function (req, res) {
  beerController.search(req, res)
})

router.get('/:id', function (req, res) {
  beerController.findById(req, res)
})

module.exports = router
