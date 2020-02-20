const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Support Mazz by voting.',
      guarded: true,
      aliases: ['voting', 'upvote'],
    });
  }

  async run(message) {
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setDescription('Sadly, Our Top.GG page is currently not around 😦 ')
      .setAuthor(message.author.username, message.author.avatarURL());
    message.channel.send(Embed);
  }

};