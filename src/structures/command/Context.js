const { APIMessage } = require('discord.js')

module.exports = class Context {
  constructor (interaction, client) {
    this.client = client
    this.interaction = interaction

    this.author = this.client.users.resolveID(interaction.member.user.id)
    this.guild = this.client.guilds.resolveID(interaction.guild_id)
    this.member = this.guild.members.cache.get(interaction.member.user.id)
    this.channel = this.guild.channels.resolveID(interaction.channel_id)
    this.data = interaction.data
  }

  async createMessage (content) {
    const message = await APIMessage.create(this.channel, content).resolveData().resolveFiles()

    return { ...message.data, files: message.files }
  }
}
