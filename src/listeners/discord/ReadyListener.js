const { Listener } = require('../../structures')
const { Status } = require('../../../assets')

const PRESENCE_INTERVAL = 60 * 1000

module.exports = class ReadyListener extends Listener {
  constructor (client) {
    super({
      events: ['ready'],
      listenerClient: 'discord'
    }, client)
  }

  onReady () {
    this.client.user.setPresence({ activity: { name: `/help | ${this.client.user.tag}`, type: 'LISTENING' } })

    setInterval(() => {
      const activity = Status[Math.floor(Math.random() * Status.length)]
      this.client.user.setPresence({ activity })
    }, PRESENCE_INTERVAL)
  }
}
