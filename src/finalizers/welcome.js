const { Finalizer } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Finalizer {
  constructor(...args) {
    super(...args, {
    });
  }

  run(message, command) {
    if (command.category === 'Economy' && !message.author.settings.first) {
      message.author.settings.update('first', true), message.send(new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setColor('#0099FF')
        .setTitle('Welcome to the Mazz Economy!')
        .setDescription('I see you\'re new to the Mazz Economy. Well, no worries!\n\nIf you want some tips on your Mazz journey, or just get to know how to play, meet the Guide.\nOpen the Guide using the command `' + message.guild.settings.prefix + 'guide`. Good luck!'),
      );
    }
  }
};