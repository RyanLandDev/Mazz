const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Cuddle with someone.',
      cooldown: 3,
      usage: '<member:member>',
      usageDelim: ' ',
    });
  }

  async run(msg, [member]) {
    if (member.displayName.includes('@everyone' || '@here') || msg.member.displayName.includes('@everyone' || '@here')) return msg.send('I\'m smarter');
    const image = await fetch('https://nekos.life/api/v2/img/cuddle')
      .then(response => response.json())
      .then(body => body.url);
    return msg.sendMessage(
      new MessageEmbed()
        .setColor('#0099FF')
        .setImage(image)
        .setDescription('**' + msg.member.displayName + '** cuddles with **' + member.displayName + '** ❤')
        .setFooter('😊💖'),
    );
  }

};