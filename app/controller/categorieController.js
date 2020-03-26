const CategorieDAO = require('../dao/categorieDAO')
const Categorie = require('../model/categorie')

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon')

class CategorieController {
  /**
   * Créer une instance de CategorieController.
   * @memberof CategorieController
   */
  constructor () {
    this.categorieDAO = new CategorieDAO()
    this.common = new ControllerCommon()
  }

  // GET, /categorie
  findAll (res) {
    this.categorieDAO.findAll()
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res))
  }

  // GET, /categorie/:id
  findById (req, res) {
    const id = req.params.id
    this.categorieDAO.findById(id)
      .then(this.common.findSuccess(res))
      .catch(this.common.findError(res))
  };

  // POST, /categorie
  create (req, res) {
    const categorie = new Categorie(req.body)
    return this.categorieDAO.create(categorie)
      .then(() => this.categorieDAO.findById(categorie.id))
      .then((categorie) => {
        res.io.emit('category', {
          type: 'CREATE',
          content: categorie
        })
        res.status(201)
        res.json(categorie)
      })
      .catch(this.common.serverError(res))
  }

  // DELETE, /categorie/:id
  deleteById (req, res) {
    const id = req.params.id

    this.categorieDAO.deleteById(id)
      .then(() => {
        res.io.emit('category', {
          type: 'DELETE',
          content: id
        })
        this.common.editSuccess(res)()
      })
      .catch(this.common.serverError(res))
  };

  // PUT, /categorie/:id
  update (req, res) {
    let categorie = new Categorie()
    categorie = Object.assign(categorie, req.body)

    return this.categorieDAO.update(categorie)
      .then(this.categorieDAO.findById(req.params.id))
      .then(() => this.categorieDAO.findById(categorie.id))
      .then((categorie) => {
        res.io.emit('category', {
          type: 'UPDATE',
          content: categorie
        })
        res.status(201)
        res.json(categorie)
      })
      .catch(err => {
        console.log(err)
        return this.common.serverError(res)(err)
      })
  };
}

module.exports = CategorieController
