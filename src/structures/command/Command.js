const { createOptionHandler } = require('../../utils')

module.exports = class Command {
  constructor (options, client) {
    options = createOptionHandler('Commands', options)

    this.name = options.required('name')
    this.category = options.optional('category', 'general')
    this.description = options.required('description')
    this.options = options.optional('options', [])

    this.hidden = options.optional('hidden', false)

    this.client = client
  }

  run (interaction) {}

  prepare () {
    return {
      name: this.name,
      description: this.description,
      options: this.options
    }
  }
}
