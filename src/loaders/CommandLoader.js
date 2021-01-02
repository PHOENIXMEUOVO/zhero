const Loader = require('../structures/Loader')
const Command = require('../structures/command/Command')

module.exports = class CommandLoader extends Loader {
  constructor (client) {
    super({
      critical: true
    }, client)

    this.commands = []
  }

  load () {
    this.loadFiles('src/commands', true)
    this.client.commands = this.commands

    return true
  }

  loadFile (NewCommand) {
    const command = new NewCommand(this.client)
    if (!(command instanceof Command)) throw new Error(`Failed to load ${NewCommand.name}: not a Command`)

    this.client.api.applications(process.env.CLIENT_ID).guilds(process.env.BOT_GUILD).commands.post({
      data: command.prepare()
    })

    this.commands.push(command)

    return true
  }
}
