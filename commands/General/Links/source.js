const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Links to the official Mazz GitHub repository.',
      guarded: true,
      aliases: ['github', 'git', 'opensource'],
    });
  }

  async run(message) {
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setDescription('The official GitHub repository for Mazz can be found [here](https://github.com/MazzStudios/Mazz).')
      .setAuthor(message.author.username, message.author.avatarURL());
    message.channel.send(Embed);
  }

};