const DaoError = require('../../../dao/commons/daoError')

module.exports = class ValidationError extends DaoError {
  constructor (error) {
    super(33, 'Args are incorrect')
    this.bad = error
  }
}
