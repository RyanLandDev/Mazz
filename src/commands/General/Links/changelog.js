const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Check the changelog for new updates.',
      guarded: true,
      aliases: ['changes', 'updates'],
    });
  }

  async run(message) {
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setDescription('The official changelog for Mazz can be found [here](https://ryanland.gitbook.io/mazz/changelog).')
      .setAuthor(message.author.username, message.author.avatarURL());
    message.channel.send(Embed);
  }

};