const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Beg for money. How deep have you sunk.',
      cooldown: 120,
      runIn: ['text'],
    });
  }

  async run(msg) {
    const reward = 
    msg.author.settings.update('balance');
  }
};