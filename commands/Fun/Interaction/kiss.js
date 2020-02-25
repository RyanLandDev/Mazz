const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Kiss someone.',
      cooldown: 3,
      usage: '<User:member>',
      usageDelim: ' ',
    });
  }

  async run(msg, [User]) {
    if (User.user.username.includes('@everyone' || '@here') || msg.author.username.includes('@everyone' || '@here')) return msg.send('I\'m smarter');
    const image = await fetch('https://nekos.life/api/kiss')
      .then(response => response.json())
      .then(body => body.url);
    return msg.sendMessage(
      new MessageEmbed()
        .setColor('#0099FF')
        .setImage(image)
        .setDescription('**' + msg.author.username + '** kisses **' + User.user.username + '** ❤')
        .setFooter('🥰💞'),
    );
  }

};