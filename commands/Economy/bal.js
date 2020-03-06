const { Command } = require('klasa');
// temporary for testing will be replaced with profile (trello 0.4.9)

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: '',
    });
  }

  async run(message) {
    message.send(message.guild.settings.get('currency') + '**' + message.author.settings.get('balance') + '**');
  }

};