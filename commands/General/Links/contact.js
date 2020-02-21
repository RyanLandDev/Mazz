const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Contact the people at Mazz.',
      guarded: true,
    });
  }

  async run(message) {
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setDescription('Contact us in the offical [Mazz Server](https://discord.gg/aZEZ7C) or at studiosmazz@gmail.com')
      .setAuthor(message.author.username, message.author.avatarURL());
    message.channel.send(Embed);

  }

};