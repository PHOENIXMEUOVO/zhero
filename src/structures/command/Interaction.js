const axios = require('axios')

module.exports = class Interaction {
  constructor (data, client) {
    this.client = client
    this.type = data.type
    this.token = data.token
    this.id = data.id
    this.data = data.data
    this.guild = this.client.guilds.cache.get(data.guild_id)
    this.channel_id = this.guild.channels.cache.get(data.channel_id)
    this.member = this.guild.members.cache.get(data.member.user.id)
    this.user = this.client.users.cache.get(data.member.user.id)
    this.args = data.data.options || []
  }

  setPrefix (prefix) {
    this.prefix = prefix
  }

  send (message) {
    axios.post(`https://discord.com/api/v8/interactions/${this.id}/${this.token}/callback`, { type: 4, data: message })
  }

  followUp (message) {
    axios.post(`https://discord.com/api/v8/webhooks/${this.client.user.id}/${this.token}`, message)
  }
}
