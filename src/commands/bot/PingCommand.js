const { Command, Embed } = require('../../structures')

module.exports = class PingCommand extends Command {
  constructor (client) {
    super({
      name: 'ping',
      description: 'Sends my latency',
      category: 'Bot',
      options: []
    }, client)
  }

  run (interaction) {
    const embed = new Embed(interaction.user)
      .setDescription(`:signal_strength: My latency: \`${Math.ceil(this.client.ws.ping)}ms\``)

    return interaction.send({
      embeds: [embed]
    })
  }
}
