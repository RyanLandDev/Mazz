const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

  run(message, command) {
    if (!command.enabled) throw message.send('This command is disabled!');
    if (message.guildSettings.disabledCommands.includes(command.name)) throw message.send('This command is disabled!');
  }

};
