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

    const embed = new Embed()
      .setDescription([
        `\`🤖\` Hi, my name is **${this.client.user.tag}**, a music bot that will surprise you ;)`,
        '`📌` I\'m using the new [_Slash Commands_](https://discord.com/developers/docs/interactions/slash-commands) of Discord, you can use `/help` to list my commands'
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
      .addField('`⭐` Additional Information', [
        `**Node.js:** \`${process.version}\``,
        `**Discord.js:** \`v${require('discord.js').version}\``,
        `**Version:** \`v${require('../../../package.json').version}\``
      ], true)
      .addField('\u200b', [
        '`❗` The bot is still in the development phase, any bug/error contact us so we can solve it as soon as possible.'
      ], false)

    return interaction.send({
      embeds: [embed]
    })
  }
}
