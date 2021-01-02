const { MessageEmbed, Constants: { Colors } } = require('discord.js')

module.exports = class Embed extends MessageEmbed {
  constructor (user, data) {
    super(data)

    this.setColor(Colors.BLURPLE)
    if (user) {
      this.setTimestamp()
      this.setFooter(user.tag, user.displayAvatarURL())
    }
  }
}
