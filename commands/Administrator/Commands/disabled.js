const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'disabled commands',
    });
  }

  async run(msg) {
    msg.send(msg.guild.settings.get('disabledCommands'));
  }
};