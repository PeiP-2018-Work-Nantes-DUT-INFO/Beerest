const Beer = require('../model/beer')

const daoCommon = require('./commons/daoCommon')

class BeerDAO {
  constructor () {
    this.common = new daoCommon()
  }

  findAll () {
    const sqlRequest = 'SELECT * FROM beer'

    return this.common.findAll(sqlRequest)
      .then(rows => {
        const beers = rows.map(row => new Beer(row))
        return beers
      })
  };

  findById (id) {
    const sqlRequest = 'SELECT * FROM beer WHERE id=$id'
    const sqlParams = { $id: id }
    return this.common.findOne(sqlRequest, sqlParams)
      .then(row => new Beer(row))
  };

  findByBreweryId (brewery_id) {
    const sqlRequest = 'SELECT * FROM beer WHERE brewery_id = ?'
    const sqlParams = [brewery_id]
    return this.common.findAllWithParams(sqlRequest, sqlParams)
      .then(row => new Beer(row))
  };

  findByCatId (cat_id) {
    const sqlRequest = 'SELECT * FROM beer WHERE cat_id = ?'
    const sqlParams = [cat_id]
    return this.common.findAllWithParams(sqlRequest, sqlParams)
      .then(row => new Beer(row))
  };

  create (beer) {
    const sqlRequest = 'INSERT INTO beer(' +
        'name,id,brewery_id, cat_id, style_id, alcohol_by_volume, international_bitterness_units, standard_reference_method, ' +
        'universal_product_code, filepath, description, add_user, last_mod, style, category, brewer, address, city, state, ' +
        'country, coordinates, website) ' +
        'VALUES ($name,$id,$brewery_id, $cat_id, $style_id, $alcohol_by_volume, $international_bitterness_units, $standard_reference_method,' +
        '$universal_product_code, $filepath, $description, $add_user, $last_mod, $style, $category, $brewer, $address, $city, $state, ' +
        '$country, $coordinates, $website) '
    const sqlParams = {
      $id: beer.id,
      $catName: beer.catName,
      $lastMod: beer.lastMod
    }
    // console.log(sqlParams, sqlRequest);
    return this.common.run(sqlRequest, sqlParams)
  };

  deleteById (id) {
    const sqlRequest = 'DELETE FROM beer WHERE id=$id'
    const sqlParams = { $id: id }
    return this.common.run(sqlRequest, sqlParams)
  };

  update (beer) {
    const sqlRequest = 'UPDATE beer SET ' +
        'name = $catName, ' +
        'id = $id ' +
        'brewery_id = $brewery_id ' +
        'cat_id = $cat_id ' +
        'style_id = $style_id ' +
        'alcohol_by_volume = $alcohol_by_volume ' +
        'international_bitterness_units = $international_bitterness_units ' +
        'standard_reference_method = $standard_reference_method ' +
        'universal_product_code = $universal_product_code ' +
        'filepath = $filepath ' +
        'description = $description ' +
        'add_user = $add_user ' +
        'last_mod = $last_mod ' +
        'style = $style ' +
        'category = $category ' +
        'brewer = $brewer ' +
        'address = $address ' +
        'city = $city ' +
        'state = $state ' +
        'country = $country ' +
        'coordinates = $coordinates ' +
        'website = $website ' +
        'WHERE id = $id'

    const sqlParams = {
      $catName: categorie.catName,
      $lastMod: categorie.lastMod,
      $id: beer.id
    }
    return this.common.run(sqlRequest, sqlParams)
  };

  /**
   * 
   * @param {Object} params 
   */
  search (params) {
    let sqlRequest_limit = ''
    let sqlRequest_offset = ''
    let sqlRequest_orderBy = ''
    let sqlRequest_where = ' WHERE'

    let sqlParams_limit = []
    let sqlParams_offset = []
    let sqlParams_orderBy = []
    let sqlParams_where = []

    for (const param in params) {
      
      switch (param) {
        case 'city':
          if (sqlRequest_where != ' WHERE') {
            sqlRequest_where += ' AND'
          }
          sqlRequest_where += ' city LIKE ?'
          sqlParams_where.push('%'+params[param]+'%')
          break;
        case 'country':
          if (sqlRequest_where != ' WHERE') {
            sqlRequest_where += ' AND'
          }
          sqlRequest_where += ' country LIKE ?'
          sqlParams_where.push('%'+params[param]+'%')
          break;
        case 'degAbove':
          if (sqlRequest_where != ' WHERE') {
            sqlRequest_where += ' AND'
          }
          sqlRequest_where += ' alcohol_by_volume > ?'
          sqlParams_where.push(params[param])
          break;
        case 'degBelow':
          if (sqlRequest_where != ' WHERE') {
            sqlRequest_where += ' AND'
          }
          sqlRequest_where += ' alcohol_by_volume < ?'
          sqlParams_where.push(params[param])
          break;
        case 'limit':
          sqlRequest_limit = ' LIMIT ?'
          sqlParams_limit.push(params[param])
          break;
        case 'orderBy':
          sqlRequest_orderBy = ' ORDER BY ?'
          sqlParams_orderBy.push(params[param])
          break;
        case 'page':
          if (params.limit) {
            sqlRequest_offset = ' OFFSET ?'
            sqlParams_offset.push(params[param]*params.limit)
          }
          break;
        }
    }

    const sqlRequest = 'SELECT * FROM beer'+
      ((sqlRequest_where)==' WHERE'?'':sqlRequest_where)+
      sqlRequest_orderBy+
      sqlRequest_limit+
      (sqlRequest_limit?sqlRequest_offset:'')
    const sqlParams = sqlParams_where.concat(sqlParams_orderBy.concat(sqlParams_limit.concat(sqlParams_offset)))
    
    console.log('Input request: \t\t',sqlRequest)
    console.log('Evaluated Params: \t',sqlParams)

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
