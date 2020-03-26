/**
 * Controllers Common functions
 */
const ValidationError = require('../../routes/api/schemas/ValidationError')
class controllerCommon {
  findSuccess (res) {
    return (result) => {
      res.status(200) // Found
      res.json(result)
    }
  }

  existsSuccess (res) {
    return (result) => {
      res.status(200) // Found
      res.json(result)
    }
  }

  editSuccess (res) {
    return () => {
      res.status(201) // Created/Updated/Deleted
      res.json({})
    }
  }

  serverError (res) {
    return (error) => {
      res.status(500) // Server internal error
      res.json(error)
    }
  }

  findError (res) {
    return (error) => {
      res.status(404) // Not found
      res.json(error)
    }
  }

  validationError (res) {
    return (error) => {
      res.status(412) // Precondition Failed
      res.json(new ValidationError(error.array()))
    }
  }
}

module.exports = controllerCommon
