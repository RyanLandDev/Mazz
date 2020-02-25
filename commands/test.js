const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Epic test',
      aliases: ['test1'],
      usage: '<something:user>',
      usageDelim: ' ',
      // this is basically the divider to define what is a new param
      // https://klasa.js.org/#/docs/klasa/master/Getting%20Started/UnderstandingUsageStrings
    });
  }

  async run(msg, params) {
    msg.send(Math.round(Math.random() * 100));

    // if you want to use IFs and other js code in embed setting do this
    const coolembed = new MessageEmbed();
    coolembed.description = 'epic';

    msg.send(
      new MessageEmbed()
        .setTimestamp()
        .setFooter('Yas')
        .setTitle()
        .setImage(params[0].avatarURL({ dynamic: true }))
        .setDescription(params[0].username),
    );
  }
};