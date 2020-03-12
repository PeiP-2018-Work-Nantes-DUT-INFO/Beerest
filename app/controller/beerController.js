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

  search (req, res) {
    const errors = validationResult(req);
    this.beerDAO.search(req.query)
      .then(this.common.findSuccess(res))
      .catch((error) => {
        res.status(412) // Precondition Failed
        res.json(error)
      }
    )
  }
}

module.exports = BeerController
