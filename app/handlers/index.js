/**
 *
 *
 * @param {SocketIO.Server} io
 */
const cityTchatHandler = require('./cityTchat')
module.exports = async (io) => {
  // namespace servant pour le tchat
  const cityTchatNsp = io.of('/tchat')
  await cityTchatHandler(cityTchatNsp)
}
