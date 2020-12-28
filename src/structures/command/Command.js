const { createOptionHandler } = require('../../utils')

module.exports = class Command {
  constructor (options, client) {
    options = createOptionHandler('Commands', options)

    this.name = options.required('name')
    this.description = options.required('description')
    this.options = options.optional('options', [])

    this.client = client
  }

  run (ctx) {}
}
