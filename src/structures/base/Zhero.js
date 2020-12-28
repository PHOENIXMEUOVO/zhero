const { Client } = require('discord.js')
const { readFileSync } = require('fs')
const { createLogger, format, transports } = require('winston')
const Loaders = require('../../loaders')

module.exports = class Zhero extends Client {
  constructor (options = {}) {
    super(options)

    this.loaded = false
    this.createLogger()
  }

  async start () {
    if (process.env.NODE_ENV !== 'production') console.log(readFileSync('.bigtitle.txt', 'utf8').toString().replace(/{UNICODE}/g, '\u001b['))
    this.logger.info('Starting Zhero...')

    const loaders = Object.values(Loaders).map(L => new L(this))
    const [preLoad, normal] = loaders.reduce(([pl, n], l) => (l.preLoad ? [[...pl, l], n] : [pl, [...n, l]]), [[], []])

    for (const l of preLoad) {
      await this.initializeLoader(l)
    }

    this.login()
      .then(() => this.logger.info('Logged in successfully'))
      .catch((e) => {
        this.logger.error(`Error on log in: ${e}`)
        process.exit(1)
      })

    for (const l of normal) {
      await this.initializeLoader(l)
    }

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

  async initializeLoader (loader) {
    let success = false
    try {
      success = await loader.load()
    } catch (e) {
      this.logError(e)
    } finally {
      if (!success && loader.critical) process.exit(1)
    }
  }
}
