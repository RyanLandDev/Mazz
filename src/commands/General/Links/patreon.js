const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Support Mazz on Patreon!',
      guarded: true,
      aliases: ['donate', 'support', 'sponsor', 'subscriptions'],
    });
  }

  async run(message) {
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setDescription('Want to support Mazz? Check out the [Patreon](https://patreon.com/mazzbot/)!')
      .setAuthor(message.author.username, message.author.avatarURL());
    message.channel.send(Embed);
  }

};