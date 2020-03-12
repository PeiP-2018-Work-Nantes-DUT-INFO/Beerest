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
        return beersvalidationResultconsole.log(err))
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

    for (const param in params) {
      console.log(`${param}: ${params[param]}`);
      if (where != ' WHERE') {
        where += ' AND'
      }
      switch (param) {
        case 'degAbove':
          where += ' alcohol_by_volume > '+params[param]
          break;
        case 'degBelow':
          where += ' alcohol_by_volume < '+params[param]
          break;
        case 'limit':
          limit = ' LIMIT '+params[param]
          break;
        case 'orderBy':
          orderBy = ' ORDER BY '+params[param]
          break;
        case 'page':
          if (limit) {
            offset = ' OFFSET '+params[param]*parseInt(params.limit)
          }
          break;
        }
    }

    
    const sqlRequest = 'SELECT * FROM beer'+((where)==' WHERE'?'':where)+orderBy+limit+(limit?offset:'')
    console.log(sqlRequest)

    return this.common.findAll(sqlRequest)
      .then(rows => {
        const beers = rows.map(row => new Beer(row))
        return beers
      })
      .catch(err => console.log(err))
  };
}

module.exports = BeerDAO
