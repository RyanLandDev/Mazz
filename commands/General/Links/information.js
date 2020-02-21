const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Get some information about Mazz.',
      guarded: true,
      aliases: ['info'],
    });
  }

  async run(message) {
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription('Below is a list of all Mazz information')
      .addField('Documentation - ', ' [Mazz Gitbook](https://ryanland.gitbook.io/mazz) ')
      .addField('Support server - ', '  [Support Server](https://discord.gg/aZEZ7Ct) ')
      .addField('Vote - ', '   top.gg bot vote page  ')
      .addField('Bot page - ', ' It is not currently available   ');
    message.channel.send(Embed);
  }

};