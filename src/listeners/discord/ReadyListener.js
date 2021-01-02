const { Listener } = require('../../structures')
const moment = require('moment')
const { Status } = require('../../../assets')
const billboard = require('billboard-top-100')

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

    setInterval(() => { this.updatePresence() }, PRESENCE_INTERVAL)
  }

  onDebug (data) {
    this.client.logger.debug(data)
  }

  updatePresence () {
    billboard.getChart('hot-100', moment().format('YYYY-MM-DD'), (error, chart) => {
      if (error) {
        this.client.error(`Billboard system error. Using default songs, error: ${error}`)
        const activity = Status[Math.floor(Math.random() * Status.length)]
        this.client.user.setPresence({ activity })
      }
      const activity = chart.songs[Math.floor(Math.random() * chart.songs.length)]
      this.client.user.setPresence({ activity: { name: `${activity.title} - ${activity.artist} | ${activity.rank}º on Billboard`, type: 'LISTENING' } })
    })
  }
}
