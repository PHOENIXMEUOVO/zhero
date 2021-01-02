const { Listener } = require('../../structures')
const { Status } = require('../../../assets')
// const axios = require('axios').default

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

    /* axios.delete(`https://discord.com/api/v8/applications/${this.client.user.id}/guilds/791225121695858718/commands/792583074054930452`, {
      headers: {
        Authorization: `Bot ${this.client.token}`
      }
    })
      .then(({ data }) => console.log(data))
      .catch(e => console.log('Error')) */

    setInterval(() => {
      const activity = Status[Math.floor(Math.random() * Status.length)]
      this.client.user.setPresence({ activity })
    }, PRESENCE_INTERVAL)
  }

  onDebug (data) {
    this.client.logger.debug(data)
  }
}
