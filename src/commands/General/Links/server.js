const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Join the official Mazz server.',
      guarded: true,
      aliases: ['supportserver', 'discordserver', 'guild', 'suggest', 'suggestion', 'idea'],
    });
  }

  async run(message) {
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setDescription('You can join the official Mazz server [here](https://discord.gg/aZEZ7Ct).')
      .setAuthor(message.author.username, message.author.avatarURL());
    message.channel.send(Embed);
  }

};