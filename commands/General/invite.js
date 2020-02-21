const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Add Mazz to your own server.',
      guarded: true,
      aliases: ['addbot', 'page', 'botpage', 'top.gg', 'botlist'],
    });
  }

  async run(message) {
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setDescription('Invite Mazz to your own server with the [Invitation Link](https://bit.ly/addmazz)\nChill with the developers or ask for help in the [Support Server](https://discord.gg/aZEZ7Ct)\n\nTop.gg Page: link\nVote for Mazz: vote link')
      .setAuthor(message.author.username, message.author.avatarURL());
    message.channel.send(Embed);
  }

};