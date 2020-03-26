const Brewery = require('../model/brewery')

const DaoCommon = require('./commons/daoCommon')

/**
 *
 *
 * @class BreweryDAO
 */
class BreweryDAO {
  /**
   * Créer une instance de BreweryDAO.
   * @memberof BreweryDAO
   */
  constructor () {
    this.common = new DaoCommon()
  }

  /**
   * Construit une requête SQL pour rechercher toutes les brasseries
   *
   * @returns
   * @memberof BreweryDAO
   */
  findAll () {
    const sqlRequest = 'SELECT * FROM brewery'

    return this.common.findAll(sqlRequest)
      .then(rows => {
        const brewerys = rows.map(row => new Brewery(row))
        return brewerys
      })
  };

  /**
   * Construit une requête SQL pour rechercher une brasserie par son id
   *
   * @param {*} id
   * @returns
   * @memberof BreweryDAO
   */
  findById (id) {
    const sqlRequest = 'SELECT * FROM brewery WHERE id=$id'
    const sqlParams = { $id: id }
    return this.common.findOne(sqlRequest, sqlParams)
      .then(row => new Brewery(row))
  };

  /**
   * Construit une requête SQL pour la création d'une brasserie
   *
   * @param {*} brewery
   * @returns
   * @memberof BreweryDAO
   */
  create (brewery) {
    const sqlRequest = 'INSERT INTO brewery(' +
            'id,breweries,address1,address2,city,state,code,country,phone,website,filepath,descript,last_mod,coordinates) ' +
            'VALUES ($id,$breweries,$address1,$address2,$city,$state,$code,$country,$phone,$website,$filepath,$descript,$lastMod,$coordinates)'
    const sqlParams = {
      $id: brewery.id,
      $breweries: brewery.breweries,
      $address1: brewery.address1,
      $address2: brewery.address2,
      $city: brewery.city,
      $state: brewery.state,
      $code: brewery.code,
      $country: brewery.country,
      $phone: brewery.phone,
      $website: brewery.website,
      $filepath: brewery.filepath,
      $descript: brewery.descript,
      $lastMod: brewery.last_mod,
      $coordinates: brewery.coordinates
    }
    // console.log(sqlParams, sqlRequest);
    return this.common.run(sqlRequest, sqlParams)
  };

  /**
   * Construit une requête SQL de suppression pour un id de brasserie
   *
   * @param {*} id
   * @returns
   * @memberof BreweryDAO
   */
  deleteById (id) {
    const sqlRequest = 'DELETE FROM brewery WHERE id=$id'
    const sqlParams = { $id: id }
    return this.common.run(sqlRequest, sqlParams)
  };

  /**
   * Construit une requête SQL de mise à jour pour une brasserie
   *
   * @param {*} brewery
   * @returns
   * @memberof BreweryDAO
   */
  update (brewery) {
    const sqlRequest = 'UPDATE brewery SET ' +
            'breweries = $breweries, ' +
            'address1 = $address1, ' +
            'address2 = $address2, ' +
            'city = $city, ' +
            'state = $state, ' +
            'code = $code, ' +
            'country = $country, ' +
            'phone = $phone, ' +
            'website = $website, ' +
            'filepath = $filepath, ' +
            'descript = $descript, ' +
            'last_mod = $lastMod, ' +
            'coordinates = $coordinates ' +
            'WHERE id = $id'

    const sqlParams = {
      $id: brewery.id,
      $breweries: brewery.breweries,
      $address1: brewery.address1,
      $address2: brewery.address2,
      $city: brewery.city,
      $state: brewery.state,
      $code: brewery.code,
      $country: brewery.country,
      $phone: brewery.phone,
      $website: brewery.website,
      $filepath: brewery.filepath,
      $descript: brewery.descript,
      $lastMod: brewery.last_mod,
      $coordinates: brewery.coordinates
    }
    return this.common.run(sqlRequest, sqlParams)
  };

  /**
   * Construit une requête SQL de filtrage à partir de paramètres
   *
   * @param {*} params
   * @returns
   * @memberof BreweryDAO
   */
  search (params) {
    // Initialisation des "morceaux" de la requête
    let sqlRequestLimit = ''
    let sqlRequestOffset = ''
    let sqlRequestOrderBy = ''
    let sqlRequestWhere = ' WHERE'

    const sqlParamsLimit = []
    const sqlParamsOffset = []
    const sqlParamsOrderBy = []
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
        case 'limit':
          sqlRequestLimit = ' LIMIT ?'
          sqlParamsLimit.push(params[param])
          break
        case 'orderBy':
          sqlRequestOrderBy = ' ORDER BY ?'
          sqlParamsOrderBy.push(params[param])
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
    const sqlRequest = 'SELECT * FROM brewery' +
            ((sqlRequestWhere) === ' WHERE' ? '' : sqlRequestWhere) +
            sqlRequestOrderBy +
            sqlRequestLimit +
            (sqlRequestLimit ? sqlRequestOffset : '')
    const sqlParams = sqlParamsWhere.concat(sqlParamsOrderBy.concat(sqlParamsLimit.concat(sqlParamsOffset)))

    // DEBUG
    console.log('Input request: \t\t', sqlRequest)
    console.log('Evaluated Params: \t', sqlParams)

    return this.common.findAllWithParams(sqlRequest, sqlParams)
      .then(rows => {
        const brewerys = rows.map(row => new Brewery(row))
        return brewerys
      })
      .catch(err => {
        console.log(err)
        return err
      })
  };
}

module.exports = BreweryDAO
