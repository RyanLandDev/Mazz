const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Join the MAZZ support server.',
      guarded: true,
      aliases: ['voting', '', 'opensource'],
    });
  }

  async run(message) {
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setDescription('Join the **__OFFICAL__** MAZZ support server [here](https://discord.gg/aZEZ7Ct)')
      .setAuthor(message.author.username, message.author.avatarURL());
    message.channel.send(Embed);
  }

};