const BeerDAO = require('../dao/beerDAO')
const Beer = require('../model/beer')

const { validationResult } = require('express-validator');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon')

class BeerController {
  constructor () {
    this.beerDAO = new BeerDAO()
    this.common = new ControllerCommon()
  }

  findAll (res) {
    this.beerDAO.findAll()
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res))
  }

  findById (req, res) {
    const id = req.params.id
    this.beerDAO.findById(id)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res))
  };

  findByBreweryId (req, res) {
    const brewery_id = req.params.brewery_id
    this.beerDAO.findByBreweryId(brewery_id)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res))
  };

  findByCatId (req, res) {
    const cat_id = req.params.cat_id
    this.beerDAO.findByBreweryId(cat_id)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res))
  };

  search (req, res) {
    console.log('\n======SEARCH======')
    console.log('Input parameters: \t',req.query)
    const errors = validationResult(req);

    if (errors.errors.length == 0) {
      this.beerDAO.search(req.query)
        .then(this.common.findSuccess(res))
        .catch(this.common.findError(res))
    } else {
      this.common.validationError(res)(errors)
    }
    console.log('====END=SEARCH====')
  }

  create (req, res) {
    const beer = new Beer(req.body)
    return this.beerDAO.create(beer)
        .then(() => this.beerDAO.findById(beer.id))
        .then((beer) => {
          res.status(201)
          res.json(beer)
        })
        .catch(this.common.serverError(res))
  }

  deleteById (req, res) {
    const id = req.params.id

    this.beerDAO.deleteById(id)
        .then(this.common.editSuccess(res))
        .catch(this.common.serverError(res))
  };

  update (req, res) {
    let beer = new Beer()
    /* categorie.id = req.body.id;
        categorie.catName = req.body.catName;
        categorie.lastMod = req.body.lastMod; */
    beer = Object.assign(beer, req.body)

    return this.beerDAO.update(beer)
        .then(this.beerDAO.findById(req.params.id))
        .then(() => this.beerDAO.findById(beer.id))
        .then((beer) => {
          res.status(201)
          res.json(beer)
        })
        .catch(err => console.log(err))
  };

}

module.exports = BeerController
