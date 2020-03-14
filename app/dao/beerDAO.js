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
    // console.log(sqlParams);
    return this.common.findOne(sqlRequest, sqlParams)
      .then(row => new Beer(row))
  };

  /**
   * 
   * @param {Object} params 
   */
  search (params) {
    let limit = ''
    let offset = ''
    let orderBy = ''
    let where = ' WHERE'
    let sqlParams_limit = []
    let sqlParams_offset = []
    let sqlParams_orderBy = []
    let sqlParams_where = []

    for (const param in params) {
      // console.log(`${param}: ${params[param]}`);
      
      switch (param) {
        case 'degAbove':
          if (where != ' WHERE') {
            where += ' AND'
          }
          where += ' alcohol_by_volume > ?'
          sqlParams_where.push(params[param])
          break;
        case 'degBelow':
          if (where != ' WHERE') {
            where += ' AND'
          }
          where += ' alcohol_by_volume < ?'
          sqlParams_where.push(params[param])
          break;
        case 'limit':
          limit = ' LIMIT ?'
          sqlParams_limit.push(params[param])
          break;
        case 'orderBy':
          orderBy = ' ORDER BY ?'
          sqlParams_orderBy.push(params[param])
          break;
        case 'page':
          if (limit) {
            offset = ' OFFSET ?'
            sqlParams_offset.push(params[param]*params.limit)
          }
          break;
        }
    }

    
    const sqlRequest = 'SELECT * FROM beer'+((where)==' WHERE'?'':where)+orderBy+limit+(limit?offset:'')
    const sqlParams = sqlParams_where.concat(sqlParams_orderBy.concat(sqlParams_limit.concat(sqlParams_offset)))
    console.log(sqlRequest)
    console.log(sqlParams)

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
