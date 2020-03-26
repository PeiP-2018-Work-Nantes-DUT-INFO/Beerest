const Brewery = require('../model/brewery')

const DaoCommon = require('./commons/daoCommon')

class BreweryDAO {
  constructor () {
    this.common = new DaoCommon()
  }

  findAll () {
    const sqlRequest = 'SELECT * FROM brewery'

    return this.common.findAll(sqlRequest)
      .then(rows => {
        const brewerys = rows.map(row => new Brewery(row))
        return brewerys
      })
  };

  findById (id) {
    const sqlRequest = 'SELECT * FROM brewery WHERE id=$id'
    const sqlParams = { $id: id }
    return this.common.findOne(sqlRequest, sqlParams)
      .then(row => new Brewery(row))
  };

  findByCatId (catId) {
    const sqlRequest = 'SELECT * FROM brewery WHERE cat_id = ?'
    const sqlParams = [catId]
    return this.common.findAllWithParams(sqlRequest, sqlParams)
      .then(row => new Brewery(row))
  };

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

  deleteById (id) {
    const sqlRequest = 'DELETE FROM brewery WHERE id=$id'
    const sqlParams = { $id: id }
    return this.common.run(sqlRequest, sqlParams)
  };

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
     *
     * @param {Object} params
     */
  search (params) {
    let sqlRequestLimit = ''
    let sqlRequestOffset = ''
    let sqlRequestOrderBy = ''
    let sqlRequestWhere = ' WHERE'

    const sqlParamsLimit = []
    const sqlParamsOffset = []
    const sqlParamsOrderBy = []
    const sqlParamsWhere = []

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

    const sqlRequest = 'SELECT * FROM brewery' +
            ((sqlRequestWhere) === ' WHERE' ? '' : sqlRequestWhere) +
            sqlRequestOrderBy +
            sqlRequestLimit +
            (sqlRequestLimit ? sqlRequestOffset : '')
    const sqlParams = sqlParamsWhere.concat(sqlParamsOrderBy.concat(sqlParamsLimit.concat(sqlParamsOffset)))

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
