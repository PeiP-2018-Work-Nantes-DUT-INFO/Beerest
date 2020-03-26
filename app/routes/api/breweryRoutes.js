const express = require('express')
const router = express.Router()

const { checkSchema } = require('express-validator')

const BreweryController = require('../../controller/breweryController')
const breweryController = new BreweryController()

/**
 *
 */
const searchBrewery = require('./schemas/SearchBrewery')

router.get('/', function (req, res) {
  breweryController.findAll(res)
})

router.post('/', function (req, res) {
  breweryController.create(req, res)
})

router.get('/search', checkSchema(searchBrewery), function (req, res) {
  breweryController.search(req, res)
})

router.get('/:id', function (req, res) {
  breweryController.findById(req, res)
})

router.delete('/:id', function (req, res) {
  breweryController.deleteById(req, res)
})

router.put('/:id', function (req, res) {
  breweryController.update(req, res)
})

module.exports = router
