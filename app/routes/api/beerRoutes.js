const express = require('express')
const router = express.Router()

const { checkSchema } = require('express-validator')

const BeerController = require('../../controller/beerController')
const beerController = new BeerController()

const searchBeer = require('./schemas/SearchBeer')

router.get('/', function (req, res) {
  beerController.findAll(res)
})

router.post('/', function (req, res) {
  beerController.create(req, res)
})
router.get('/search', checkSchema(searchBeer), function (req, res) {
  beerController.search(req, res)
})

router.get('/brewery/:brewery_id', function (req, res) {
  beerController.findByBreweryId(req, res)
})

router.get('/cat/:cat_id', function (req, res) {
  beerController.findByCatId(req, res)
})

router.get('/:id', function (req, res) {
  beerController.findById(req, res)
})

router.delete('/:id', function (req, res) {
  beerController.deleteById(req)
})

router.put('/:id', function (req, res) {
  beerController.update(req, res)
})

module.exports = router
