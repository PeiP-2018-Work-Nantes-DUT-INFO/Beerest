const DaoCommon = require('../dao/commons/daoCommon')

/**
 *
 *
 * @param {SocketIO.Server} io
 */
module.exports = async (io) => {
  const daoInstance = new DaoCommon()
  /**
   * @type {Array<string>}
   */
  const rowResults = await daoInstance.findAll('SELECT DISTINCT city from brewery')
  const cities = rowResults.map(obj => obj.city).filter(city => city.length > 0)
  io.on('connection', function (socket) {
    socket.on('error', (err) => {
      socket.emit('room-error', err.message)
    })
    console.log(`${socket.client.id} just connected to tchat namespace`)
    socket.on('room', (city) => {
      if (cities.indexOf(city) < 0) {
        socket.emit('error', new Error('City does not exist'))
        return
      }
      if (socket.rooms[city]) {
        socket.emit('error', new Error('You are already in this city room'))
        return
      }
      socket.leaveAll()
      console.log(`Socket ${socket.client.id} just connected to ${city}`)
      socket.join(city)
    })
    socket.on('message', (message) => {
      const joinedCities = Object.keys(socket.rooms).filter(city => cities.indexOf(city) > -1)
      if (joinedCities.length === 0) {
        socket.emit('error', new Error('You should join a room before'))
      }
      const city = joinedCities[0]
      const prefixedMessage = `${socket.client.id} [${city}]: ${message}`
      console.log(prefixedMessage)
      socket.broadcast.to(city).emit('message', prefixedMessage)
    })
    socket.on('disconnect', () => {
      console.log(`${socket.client.id} just disconnected from tchat namespace`)
    })
  })
}
