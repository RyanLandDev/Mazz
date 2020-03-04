const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');


module.exports = class extends Command {

  constructor(...args) {
      super(...args, {
          description: 'do some begging on the streets',
          cooldown: 300,
      });
    }

async run(message) {
    const response = responses[Math.round(Math.random() * response.length)];
    message.author.settings.update('balance')
