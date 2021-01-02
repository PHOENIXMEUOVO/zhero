const { Command, Embed } = require('../../structures')

module.exports = class HelpCommand extends Command {
  constructor (client) {
    super({
      name: 'help',
      description: 'Sends my command list',
      category: 'Bot',
      options: [
        {
          name: 'command',
          required: false,
          description: 'Command to see more information',
          type: 3
        }
      ]
    }, client)
  }

  run (interaction) {
    const embed = new Embed(interaction.user)
    const validCommands = this.client.commands.filter(({ hidden }) => !hidden)
    const command = interaction.args.length && validCommands.find(({ name }) => name === interaction.args[0].value)

    if (command) {
      embed
        .setDescription([
          `\`❓\` **Usage:** ${this.buildCommandUsage(command, interaction.prefix)}`,
          `\`📜\` **Description:** \`${command.description}\``,
          `\`🎫\` **Category:** \`${command.category}\``,
          command.options.length ? '\n`💡` _**<>** are optional and **[]** are required_' : ''
        ])
    } else {
      embed.setDescription([
        `\`🌍\` **Prefix:** \`${interaction.prefix}\``,
        '',
        ...validCommands.map(({ name, description }) => `• \`/${name}\` - *${description}*`),
        '',
        `\`❓\` To know more about a command, use ${this.buildCommandUsage(this, interaction.prefix)}`
      ])
    }

    interaction.send({
      embeds: [embed]
    })
  }

  buildCommandUsage (command, prefix) {
    const formatOptions = (options) => options.map(option => option.required ? `[${option.name}]` : `<${option.name}>`).join(' ')
    return `\`${prefix}${command.name}${command.options.length ? ` ${formatOptions(command.options)}` : ''}\``
  }
}
