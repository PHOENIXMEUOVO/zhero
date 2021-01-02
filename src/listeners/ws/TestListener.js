/* eslint-disable camelcase */
const { Listener, Interaction } = require('../../structures')

module.exports = class ReadyListener extends Listener {
  constructor (client) {
    super({
      events: ['INTERACTION_CREATE'],
      listenerClient: 'ws'
    }, client)
  }

  onINTERACTION_CREATE (data) {
    const interaction = new Interaction(data, this.client)
    interaction.setPrefix(process.env.PREFIX)

    const command = this.client.commands.find(({ name }) => name === interaction.data.name)
    if (command) command.run(interaction)
  }
}
