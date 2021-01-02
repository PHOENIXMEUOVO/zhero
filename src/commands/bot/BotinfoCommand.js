const { Command, Embed } = require('../../structures')

module.exports = class BotinfoCommand extends Command {
  constructor (client) {
    super({
      name: 'botinfo',
      description: 'Sends my information',
      category: 'Bot',
      options: []
    }, client)
  }

  async run (interaction) {
    const validCommands = this.client.commands.filter(({ hidden }) => !hidden)
    const invite = await this.client.generateInvite()
    const embed = new Embed(interaction.user)
      .setDescription([
        `\`🤖\` _Hi, my name is **${this.client.user.tag}**, a music bot that will surprise you_`
      ])
      .addField('`📊` Stats', [
        `**Commands:** \`${validCommands.length}\``,
        `**Users:** \`${this.client.users.cache.size}\``,
        `**Guilds:** \`${this.client.guilds.cache.size}\``
      ], true)
      .addField('`📎` Useful links', [
        '[**Github**](https://github.com/zherodiscord/zhero)',
        '[**Support**](https://discord.gg/aVcU4Re2Qh)',
        `[**Invite**](${invite})`
      ], true)

    return interaction.send({
      embeds: [embed]
    })
  }
}
