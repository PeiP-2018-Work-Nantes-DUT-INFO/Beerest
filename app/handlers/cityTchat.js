const DaoCommon = require('../dao/commons/daoCommon')

/**
 *
 *
 * @param {SocketIO.Server} io
 */
module.exports = async (io) => {
  const daoInstance = new DaoCommon()
  /**
   * Contient tous les noms de villes uniques de la table brewery
   * @type {Array<string>}
   */
  const rowResults = await daoInstance.findAll('SELECT DISTINCT city from brewery')
  // On enlève les noms de villes vide
  const cities = rowResults.map(obj => obj.city).filter(city => city.length > 0)
  io.on('connection', function (socket) {
    socket.on('error', (err) => { // lorsque l'on reçoi un erreur, on envoit au client l'erreur
      socket.emit('room-error', err.message)
    })
    console.log(`${socket.client.id} just connected to tchat namespace`)
    // Handler qui permet de rejoindre une room, émis par le client.
    socket.on('room', (city) => {
      if (cities.indexOf(city) < 0) {
        socket.emit('error', new Error('City does not exist'))
        return
      }
      if (socket.rooms[city]) {
        socket.emit('error', new Error('You are already in this city room'))
        return
      }
      socket.leaveAll() // on quite toutes les rooms avant d'en rejoindre une nouvelle
      console.log(`Socket ${socket.client.id} just connected to ${city}`)
      socket.join(city)
    })
    // handler qui permet d'envoyer un message sur la room d'une ville
    socket.on('message', (message) => {
      /**
       * Tableau qui contient toutes les room de ville qu'a rejoint le client
       */
      const joinedCities = Object.keys(socket.rooms)
        .filter(city => cities.indexOf(city) > -1) // comme un socket est connecté à une room par défaut, on filtre les rooms qui ne sont pas des rooms de villes

      if (joinedCities.length === 0) { // On n'a pas encore rejoint de room, on envoit une erreur
        socket.emit('error', new Error('You should join a room before'))
      }
      const city = joinedCities[0]
      const prefixedMessage = `${socket.client.id} [${city}]: ${message}`
      console.log(prefixedMessage)
      socket.broadcast.to(city).emit('message', prefixedMessage) // on fait suivre le messafe à tous les membres de la room
    })
    socket.on('disconnect', () => {
      console.log(`${socket.client.id} just disconnected from tchat namespace`)
    })
  })
}
