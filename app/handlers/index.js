/**
 *
 *
 * @param {SocketIO.Server} io
 */
const cityTchatHandler = require('./cityTchat')
module.exports = async (io) => {
  const cityTchatNsp = io.of('/tchat')
  await cityTchatHandler(cityTchatNsp)
}
