const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Claim your daily reward.',
      cooldown: 43200,
      runIn: ['text'],
    });
  }

  async run(msg) {
    const today = moment().format('DDD');
    msg.author.settings.update('balance', msg.author.settings.get('balance'))
  }
};