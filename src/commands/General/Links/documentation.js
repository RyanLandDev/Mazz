const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Links to the Mazz documentation.',
      guarded: true,
      aliases: ['docs'],
    });
  }

  async run(message) {
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setDescription('Join the official Mazz server.')
      .setAuthor(message.author.username, message.author.avatarURL());
    message.channel.send(Embed);
  }

};