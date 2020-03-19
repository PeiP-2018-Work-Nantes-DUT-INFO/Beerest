const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const database = require('./app/config/dbconfig')
const port = process.argv[2] || 3000
process.env = {
  DEBUG: 'socket.io:client*'
}
process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`)
})

database
  .init
  .then((db) => {
    http.listen(port, function (err) {
      if (err) {
        console.error(err)
      }
      console.log('Server listening on port : ' + port)
    })

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    /* Router configuration */
    const REST_API_ROOT = '/api'
    app.use(REST_API_ROOT, require('./app/routes/router'))

    // accès aux pages statiques
    app.use('/static', express.static('static'))
    require('./app/handlers/index')(io)
  })

app.use(function (_, res, next) {
  res.io = io
  next()
})
