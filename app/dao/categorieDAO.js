const Categorie = require('../model/categorie')

const DaoCommon = require('./commons/daoCommon')

/**
 *
 *
 * @class CategorieDAO
 */
class CategorieDAO {
  /**
   *Creates an instance of CategorieDAO.
   * @memberof CategorieDAO
   */
  constructor () {
    this.common = new DaoCommon()
  }

  /**
   *
   *
   * @returns
   * @memberof CategorieDAO
   */
  findAll () {
    const sqlRequest = 'SELECT * FROM categorie'

    return this.common.findAll(sqlRequest)
      .then(rows => {
        const categories = rows.map(row => new Categorie(row))
        return categories
      })
      .catch(err => console.log(err))
  };

  /**
   *
   *
   * @param {*} id
   * @returns
   * @memberof CategorieDAO
   */
  findById (id) {
    const sqlRequest = 'SELECT * FROM categorie WHERE id=$id'
    const sqlParams = { $id: id }
    // console.log(sqlParams);
    return this.common.findOne(sqlRequest, sqlParams)
      .then(row => new Categorie(row))
  };

  /**
   *
   *
   * @param {*} categorie
   * @returns
   * @memberof CategorieDAO
   */
  create (categorie) {
    const sqlRequest = 'INSERT INTO categorie(' +
            'id,cat_name,last_mod) ' +
            'VALUES ($id,$catName,$lastMod)'
    const sqlParams = {
      $id: categorie.id,
      $catName: categorie.catName,
      $lastMod: categorie.lastMod
    }
    // console.log(sqlParams, sqlRequest);
    return this.common.run(sqlRequest, sqlParams)
  };

  /**
   *
   *
   * @param {*} id
   * @returns
   * @memberof CategorieDAO
   */
  deleteById (id) {
    const sqlRequest = 'DELETE FROM categorie WHERE id=$id'
    const sqlParams = { $id: id }
    return this.common.run(sqlRequest, sqlParams)
  };

  /**
   *
   *
   * @param {*} categorie
   * @returns
   * @memberof CategorieDAO
   */
  update (categorie) {
    const sqlRequest = 'UPDATE categorie SET ' +
            'cat_name=$catName, ' +
            'last_mod=$lastMod ' +
            'WHERE id=$id'

    const sqlParams = {
      $catName: categorie.catName,
      $lastMod: categorie.lastMod,
      $id: categorie.id
    }
    return this.common.run(sqlRequest, sqlParams)
  };
}

module.exports = CategorieDAO
