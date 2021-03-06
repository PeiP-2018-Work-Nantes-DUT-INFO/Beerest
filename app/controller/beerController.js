const BeerDAO = require('../dao/beerDAO')
const Beer = require('../model/beer')

const { validationResult } = require('express-validator')

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon')

class BeerController {
  /**
   * Créer une instance de BeerController.
   * @memberof BeerController
   */
  constructor () {
    this.beerDAO = new BeerDAO()
    this.common = new ControllerCommon()
  }

  // GET, /beer
  findAll (res) {
    this.beerDAO.findAll()
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res))
  }

  // GET, /beer/:id
  findById (req, res) {
    const id = req.params.id
    this.beerDAO.findById(id)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res))
  };

  // GET,  /beer/brewery/:brewery_id
  findByBreweryId (req, res) {
    const breweryID = req.params.brewery_id
    this.beerDAO.findByBreweryId(breweryID)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res))
  };

  // GET,  /beer/cat/:cat_id
  findByCatId (req, res) {
    const catID = req.params.cat_id
    this.beerDAO.findByBreweryId(catID)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res))
  };

  // GET, /beer/search?x=[]
  search (req, res) {
    console.log('\n======SEARCH======')
    console.log('Input parameters: \t', req.query)
    const errors = validationResult(req)

    if (errors.errors.length === 0) {
      this.beerDAO.search(req.query)
        .then(this.common.findSuccess(res))
        .catch(this.common.findError(res))
    } else {
      this.common.validationError(res)(errors)
    }
    console.log('====END=SEARCH====')
  }

  // POST, /beer
  create (req, res) {
    const beer = new Beer(req.body)
    return this.beerDAO.create(beer)
      .then(() => this.beerDAO.findById(beer.id))
      .then((beer) => {
        res.io.emit('beer', {
          type: 'CREATE',
          content: beer
        })
        res.status(201)
        res.json(beer)
      })
      .catch(this.common.serverError(res))
  }

  // DELETE, /beer/:id
  deleteById (req, res) {
    const id = req.params.id

    this.beerDAO.deleteById(id)
      .then(() => {
        res.io.emit('beer', {
          type: 'DELETE',
          content: id
        })
        this.common.editSuccess(res)()
      })
      .catch(this.common.serverError(res))
  };

  // PUT, /beer/:id
  update (req, res) {
    let beer = new Beer()
    beer = Object.assign(beer, req.body)

    return this.beerDAO.update(beer)
      .then(this.beerDAO.findById(req.params.id))
      .then(() => this.beerDAO.findById(beer.id))
      .then((beer) => {
        res.io.emit('beer', {
          type: 'UPDATE',
          content: beer
        })
        res.status(201)
        res.json(beer)
      })
      .catch(err => {
        console.log(err)
        return this.common.serverError(res)(err)
      })
  };
}

module.exports = BeerController
