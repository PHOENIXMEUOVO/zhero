const { Client } = require('discord.js')
const { readFileSync } = require('fs')

module.exports = class Zhero extends Client {
  constructor (options = {}) {
    super(options)

    this.on('ready', () => this.user.setPresence({ activity: { name: `pop songs | ${this.user.tag}`, type: 'LISTENING' } }))
  }

  start () {
    if (process.env.NODE_ENV !== 'production') console.log(readFileSync('.bigtitle.txt', 'utf8').toString().replace(/{UNICODE}/g, '\u001b['))
    console.log('Starting Zhero...')

    this.login()
      .then(() => console.log('Logged in successfully'))
      .catch((e) => {
        console.log(`Error on log in: ${e}`)
        process.exit(1)
      })
  }

  login (token = process.env.DISCORD_TOKEN) {
    return super.login(token)
  }
}
