/* Load database & database configuration */
const database = require('../../config/dbconfig')

/* Load DAO Error entity */
const DaoError = require('./daoError')

/**
 * DAOs Common functions
 */
class Common {
  /**
   * Exécute la requête SQL et renvoi toutes les lignes d'une table
   *
   * @param {*} sqlRequest
   * @returns
   * @memberof Common
   */
  findAll (sqlRequest) {
    return new Promise(function (resolve, reject) {
      database.db.all(sqlRequest, function (err, rows) {
        if (err) {
          reject(
            new DaoError(20, 'Internal server error')
          )
        } else if (rows === null || rows.length === 0) {
          reject(
            new DaoError(21, 'Entity not found')
          )
        } else {
          resolve(rows)
        }
      })
    })
  }

  /**
   * Exécute la requête SQL et renvoi toutes les lignes correspondantes
   *
   * @param {*} sqlRequest
   * @param {*} sqlParams
   * @returns
   * @memberof Common
   */
  findAllWithParams (sqlRequest, sqlParams) {
    return new Promise(function (resolve, reject) {
      const stmt = database.db.prepare(sqlRequest)

      stmt.all(sqlParams, function (err, rows) {
        if (err) {
          reject(
            new DaoError(11, 'Invalid arguments')
          )
        } else if (rows === null || rows.length === 0) {
          reject(
            new DaoError(21, 'Entity not found')
          )
        } else {
          resolve(rows)
        }
      })
    })
  }

  /**
   * Exécute la requête SQL et renvoi une seule ligne
   *
   * @param {*} sqlRequest
   * @param {*} sqlParams
   * @returns
   * @memberof Common
   */
  findOne (sqlRequest, sqlParams) {
    return new Promise(function (resolve, reject) {
      const stmt = database.db.prepare(sqlRequest)
      stmt.all(sqlParams, function (err, rows) {
        if (err) {
          reject(
            new DaoError(11, 'Invalid arguments')
          )
        } else if (rows === null || rows.length === 0) {
          reject(
            new DaoError(21, 'Entity not found')
          )
        } else {
          const row = rows[0]
          resolve(row)
        }
      })
    })
  }

  /**
   * Exécute la requête SQL en prepare statement
   *
   * @param {*} sqlRequest
   * @param {*} sqlParams
   * @returns
   * @memberof Common
   */
  run (sqlRequest, sqlParams) {
    return new Promise(function (resolve, reject) {
      const stmt = database.db.prepare(sqlRequest)
      stmt.run(sqlParams, function (err) {
        if (this.changes === 1) {
          resolve(true)
        } else if (this.changes === 0) {
          reject(
            new DaoError(21, 'Entity not found')
          )
        } else {
          console.log(err)
          reject(
            new DaoError(11, 'Invalid arguments')
          )
        }
      })
    })
  }
}

module.exports = Common
