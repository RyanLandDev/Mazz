const { Command } = require('klasa');

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