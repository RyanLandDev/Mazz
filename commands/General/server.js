const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Links to the Mazz documentation.',
      guarded: true,
      aliases: ['support', 'supportserver', 'discordserver', 'guild'],
    });
  }

  async run(message) {
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setDescription('The documentation of Mazz can be found [here](https://ryanland.gitbook.io/mazz)')
      .setAuthor(message.author.username, message.author.avatarURL());
    message.channel.send(Embed);
  }

};