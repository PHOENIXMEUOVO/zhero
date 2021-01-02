/* eslint-disable no-eval */
const { Command } = require('../../structures')
const { inspect } = require('util')

module.exports = class EvalCommand extends Command {
  constructor (client) {
    super({
      name: 'eval',
      description: 'Evaluate a code',
      category: 'Developers',
      hidden: true,
      options: [
        {
          name: 'code',
          required: true,
          description: 'The code to be evaluate',
          type: 3
        }
      ]
    }, client)
  }

  async run (interaction) {
    const [{ value: code }] = interaction.args
    if (!this.client.guilds.cache.get(process.env.BOT_GUILD).members.cache.get(interaction.user.id).roles.cache.has('794780229704220672')) return

    try {
      let message = await this.result(eval(code))

      if (message.length > 2000) { message = 'Message too long' }

      interaction.send({
        content: `\`\`\`js\n${await this.clean(message)}\`\`\``
      })
    } catch (error) {
      interaction.send({
        content: `\`\`\`js\n${await this.clean(error.message)}\`\`\``
      })
    }
  }

  async clean (text) {
    if (text instanceof Promise || (Boolean(text) && typeof text.then === 'function' && typeof text.catch === 'function')) { text = await text }
    if (typeof text !== 'string') { text = inspect(text, { depth: 0, showHidden: false }) }

    text = text.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`)
    return text
  }

  async result (temp) {
    if (temp && temp[Symbol.toStringTag] === 'AsyncFunction') { return this.result(await temp()) }
    if (temp && temp instanceof Promise) { return this.result(await temp) }

    return temp
  }
}
