const Beer = require('../model/beer')

const DaoCommon = require('./commons/daoCommon')

/**
 *
 *
 * @class BeerDAO
 */
class BeerDAO {
  /**
   * Créer une instance de BeerDAO.
   * @memberof BeerDAO
   */
  constructor () {
    this.common = new DaoCommon()
  }

  /**
   * Construit une requête SQL pour rechercher toutes les bières
   *
   * @returns {Promise<any>}
   * @memberof BeerDAO
   */
  findAll () {
    const sqlRequest = 'SELECT * FROM beer'

    return this.common.findAll(sqlRequest)
      .then(rows => {
        const beers = rows.map(row => new Beer(row))
        return beers
      })
  };

  /**
   * Construit une requête SQL pour rechercher une bière par son id
   *
   * @param {*} id
   * @returns {Promise<any>}
   * @memberof BeerDAO
   */
  findById (id) {
    const sqlRequest = 'SELECT * FROM beer WHERE id=$id'
    const sqlParams = { $id: id }
    return this.common.findOne(sqlRequest, sqlParams)
      .then(row => new Beer(row))
  };

  /**
   * Construit une requête SQL pour rechercher les bières d'une brasserie
   *
   * @param {*} breweryID
   * @returns {Promise<any>}
   * @memberof BeerDAO
   */
  findByBreweryId (breweryID) {
    const sqlRequest = 'SELECT * FROM beer WHERE brewery_id = ?'
    const sqlParams = [breweryID]
    return this.common.findAllWithParams(sqlRequest, sqlParams)
      .then(row => new Beer(row))
  };

  /**
   * Construit une requête SQL pour rechercher les bières d'une catégorie
   *
   * @param {*} catID
   * @returns {Promise<any>}
   * @memberof BeerDAO
   */
  findByCatId (catID) {
    const sqlRequest = 'SELECT * FROM beer WHERE cat_id = ?'
    const sqlParams = [catID]
    return this.common.findAllWithParams(sqlRequest, sqlParams)
      .then(row => new Beer(row))
  };

  /**
   * Construit une requête SQL pour la création d'une bière
   *
   * @param {*} beer la bière à ajouter
   * @returns {Promise<any>}
   * @memberof BeerDAO
   */
  create (beer) {
    const sqlRequest = 'INSERT into beer (' +
    'name,id,brewery_id,cat_id,style_id,alcohol_by_volume,international_bitterness_units,standard_reference_method,universal_product_code,universal_product_code,description,add_user,last_mod,style,category,brewer,address,city,state,country,coordinates,website) ' +
    'VALUES ($name,$id,$breweryId,$catId,$styleId,$alcoholByVolume,$internationalBitternessUnits,$standardReferenceMethod,$universalProductCode,$filepath,$description,$addUser,$lastMod,$style,$category,$brewer,$address,$city,$state,$country,$coordinates,$website)'
    const sqlParams = {
      $name: beer.name,
      $id: beer.id,
      $breweryId: beer.brewery_id,
      $catId: beer.cat_id,
      $styleId: beer.style_id,
      $alcoholByVolume: beer.alcohol_by_volume,
      $internationalBitternessUnits: beer.international_bitterness_units,
      $standardReferenceMethod: beer.standard_reference_method,
      $universalProductCode: beer.universal_product_code,
      $filepath: beer.filepath,
      $description: beer.description,
      $addUser: beer.add_user,
      $lastMod: beer.last_mod,
      $style: beer.style,
      $category: beer.category,
      $brewer: beer.brewer,
      $address: beer.address,
      $city: beer.city,
      $state: beer.state,
      $country: beer.country,
      $coordinates: beer.coordinates,
      $website: beer.website
    }
    return this.common.run(sqlRequest, sqlParams)
  };

  /**
   * Construit une requête SQL de suppression pour un id de bière
   *
   * @param {*} id
   * @returns {Promise<any>}
   * @memberof BeerDAO
   */
  deleteById (id) {
    const sqlRequest = 'DELETE FROM beer WHERE id=$id'
    const sqlParams = { $id: id }
    return this.common.run(sqlRequest, sqlParams)
  };

  /**
   * Construit une requête SQL de mise à jour pour une bière
   *
   * @param {*} beer
   * @returns {Promise<any>}
   * @memberof BeerDAO
   */
  update (beer) {
    const sqlRequest = 'UPDATE beer SET ' +
    'name=$name, ' +
    'brewery_id=$breweryId, ' +
    'cat_id=$catId, ' +
    'style_id=$styleId, ' +
    'alcohol_by_volume=$alcoholByVolume, ' +
    'international_bitterness_units=$internationalBitternessUnits, ' +
    'standard_reference_method=$standardReferenceMethod, ' +
    'universal_product_code=$universalProductCode, ' +
    'description=$description, ' +
    'add_user=$addUser, ' +
    'last_mod=$lastMod, ' +
    'filepath=$filepath, ' +
    'style=$style, ' +
    'category=$category, ' +
    'brewer=$brewer, ' +
    'address=$address, ' +
    'city=$city, ' +
    'state=$state, ' +
    'country=$country, ' +
    'coordinates=$coordinates, ' +
    'website=$website ' +
    'WHERE id=$id'

    const sqlParams = {
      $name: beer.name,
      $id: beer.id,
      $breweryId: beer.brewery_id,
      $catId: beer.cat_id,
      $styleId: beer.style_id,
      $alcoholByVolume: beer.alcohol_by_volume,
      $internationalBitternessUnits: beer.international_bitterness_units,
      $standardReferenceMethod: beer.standard_reference_method,
      $universalProductCode: beer.universal_product_code,
      $filepath: beer.filepath,
      $description: beer.description,
      $addUser: beer.add_user,
      $lastMod: beer.last_mod,
      $style: beer.style,
      $category: beer.category,
      $brewer: beer.brewer,
      $address: beer.address,
      $city: beer.city,
      $state: beer.state,
      $country: beer.country,
      $coordinates: beer.coordinates,
      $website: beer.website
    }
    return this.common.run(sqlRequest, sqlParams)
  };

  /**
   * Construit une requête SQL de filtrage à partir de paramètres
   *
   * @param {*} params
   * @returns {Promise<any>}
   * @memberof BeerDAO
   */
  search (params) {
    // Initialisation des "morceaux" de la requête
    let sqlRequestLimit = ''
    let sqlRequestOffset = ''
    let sqlRequestOrderBy = ''
    let sqlRequestWhere = ' WHERE'

    const sqlParamsLimit = []
    const sqlParamsOffset = []
    const sqlParamsWhere = []

    // Construction de chaque "morceau" avec les arguments reçus
    for (const param in params) {
      switch (param) {
        case 'city':
          if (sqlRequestWhere !== ' WHERE') {
            sqlRequestWhere += ' AND'
          }
          sqlRequestWhere += ' city LIKE ?'
          sqlParamsWhere.push('%' + params[param] + '%')
          break
        case 'country':
          if (sqlRequestWhere !== ' WHERE') {
            sqlRequestWhere += ' AND'
          }
          sqlRequestWhere += ' country LIKE ?'
          sqlParamsWhere.push('%' + params[param] + '%')
          break
        case 'degAbove':
          if (sqlRequestWhere !== ' WHERE') {
            sqlRequestWhere += ' AND'
          }
          sqlRequestWhere += ' alcohol_by_volume > ?'
          sqlParamsWhere.push(params[param])
          break
        case 'degBelow':
          if (sqlRequestWhere !== ' WHERE') {
            sqlRequestWhere += ' AND'
          }
          sqlRequestWhere += ' alcohol_by_volume < ?'
          sqlParamsWhere.push(params[param])
          break
        case 'limit':
          sqlRequestLimit = ' LIMIT ?'
          sqlParamsLimit.push(params[param])
          break
        case 'orderBy':
          sqlRequestOrderBy = ' ORDER BY ' + params[param]
          break
        case 'page':
          if (params.limit) {
            sqlRequestOffset = ' OFFSET ?'
            sqlParamsOffset.push(params[param] * params.limit)
          }
          break
      }
    }

    // Construction de la requête finale dans le bon ordre
    const sqlRequest = 'SELECT * FROM beer' +
      ((sqlRequestWhere) === ' WHERE' ? '' : sqlRequestWhere) +
      sqlRequestOrderBy +
      sqlRequestLimit +
      (sqlRequestLimit ? sqlRequestOffset : '')
    const sqlParams = sqlParamsWhere.concat(sqlParamsLimit.concat(sqlParamsOffset))

    // DEBUG
    console.log('Input request: \t\t', sqlRequest)
    console.log('Evaluated Params: \t', sqlParams)

    return this.common.findAllWithParams(sqlRequest, sqlParams)
      .then(rows => {
        const beers = rows.map(row => new Beer(row))
        return beers
      })
      .catch(err => {
        console.log(err)
        return err
      })
  };
}

module.exports = BeerDAO
