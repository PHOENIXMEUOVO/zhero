const { Client } = require('discord.js')
const { readFileSync } = require('fs')
const { createLogger, format, transports } = require('winston')

module.exports = class Zhero extends Client {
  constructor (options = {}) {
    super(options)

    this.loaded = false
    this.createLogger()
  }

  async start () {
    if (process.env.NODE_ENV !== 'production') console.log(readFileSync('.bigtitle.txt', 'utf8').toString().replace(/{UNICODE}/g, '\u001b['))
    this.logger.info('Starting Zhero...')

    this.login()
      .then(() => this.logger.info('Logged in successfully'))
      .catch((e) => {
        this.logger.error(`Error on log in: ${e}`)
        process.exit(1)
      })

    this.loaded = true
  }

  login (token = process.env.DISCORD_TOKEN) {
    return super.login(token)
  }

  createLogger () {
    this.logger = createLogger()
    this.logger.add(new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'DD/MM/YYYY | HH:mm:ss'
        }),
        format.printf(
          info => `${info.timestamp} - ${info.level}${info.label ? ` [${info.label || ''}]` : ''}: ${info.message}`
        )
      ),
      level: process.env.LOGGING_LEVEL || 'silly'
    }))
  }
}
