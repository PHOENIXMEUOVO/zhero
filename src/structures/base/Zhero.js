const { Client } = require('discord.js')

module.exports = class Zhero extends Client {
  constructor (options = {}) {
    super(options)

    this.on('ready', () => this.user.setPresence({ activity: { name: 'pop songs', type: 'LISTENING' } }))
  }

  start () {
    this.login()
      .then(() => console.log('Logged in successfully'))
      .catch((e) => console.log(`Error on log in: ${e}`))
  }

  login (token = process.env.DISCORD_TOKEN) {
    return super.login(token)
  }
}
