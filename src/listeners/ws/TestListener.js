/* eslint-disable camelcase */
const { Listener } = require('../../structures')
const { Constants: { Colors } } = require('discord.js')

module.exports = class ReadyListener extends Listener {
  constructor (client) {
    super({
      events: ['INTERACTION_CREATE'],
      listenerClient: 'ws'
    }, client)
  }

  onINTERACTION_CREATE ({ id, token, data }) {
    if (data.name !== 'ping') return
    this.client.api.interactions(id, token).callback.post({
      data: {
        type: 3,
        data: {
          embeds: [
            {
              description: `:ping_pong: \`${Math.ceil(this.client.ws.ping)}ms\``,
              color: Colors.BLURPLE
            }
          ]
        }
      }
    })
  }
}
