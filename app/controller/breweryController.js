const BreweryDAO = require('../dao/breweryDAO')
const Brewery = require('../model/brewery')

const { validationResult } = require('express-validator')

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon')

class BreweryController {
  constructor () {
    this.breweryDAO = new BreweryDAO()
    this.common = new ControllerCommon()
  }

  findAll (res) {
    this.breweryDAO.findAll()
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res))
  }

  findById (req, res) {
    const id = req.params.id
    this.breweryDAO.findById(id)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res))
  };

  search (req, res) {
    console.log('\n======SEARCH======')
    console.log('Input parameters: \t', req.query)
    const errors = validationResult(req)

    if (errors.errors.length === 0) {
      this.breweryDAO.search(req.query)
        .then(this.common.findSuccess(res))
        .catch(this.common.findError(res))
    } else {
      this.common.validationError(res)(errors)
    }
    console.log('====END=SEARCH====')
  }

  create (req, res) {
    const brewery = new Brewery(req.body)
    return this.breweryDAO.create(brewery)
      .then(() => this.breweryDAO.findById(brewery.id))
      .then((brewery) => {
        res.io.emit('brewery', {
          type: 'CREATE',
          content: brewery
        })
        res.status(201)
        res.json(brewery)
      })
      .catch(this.common.serverError(res))
  }

  deleteById (req, res) {
    const id = req.params.id

    this.breweryDAO.deleteById(id)
      .then(() => {
        res.io.emit('brewery', {
          type: 'DELETE',
          content: id
        })
        this.common.editSuccess(res)()
      }
      )
      .catch(err => {
        console.log(err)
        return this.common.serverError(res)(err)
      })
  };

  update (req, res) {
    let brewery = new Brewery()
    /* categorie.id = req.body.id;
            categorie.catName = req.body.catName;
            categorie.lastMod = req.body.lastMod; */
    brewery = Object.assign(brewery, req.body)

    return this.breweryDAO.update(brewery)
      .then(this.breweryDAO.findById(req.params.id))
      .then(() => this.breweryDAO.findById(brewery.id))
      .then((brewery) => {
        res.io.emit('brewery', {
          type: 'UPDATE',
          content: brewery
        })
        res.status(201)
        res.json(brewery)
      })
      .catch(err => {
        console.log(err)
        return this.common.serverError(res)(err)
      })
  };
}

module.exports = BreweryController
