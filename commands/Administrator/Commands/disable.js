const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Disable a command.',
      usage: '<command:command>',
      guarded: true,
      runIn: ['text'],
      // server admin
      permissionLevel: 24,
    });
  }

  async run(msg, [command]) {
    if (command.guarded === true) throw msg.send('This command cannot be disabled.');
    if (msg.guild.settings.get('disabledCommands').includes(command.name)) throw msg.send('This command is already disabled.');

    msg.guild.settings.update('disabledCommands', command.name, { action: 'add' });
    msg.send(`The \`${command.name}\` command has been disabled!\nYou can enable it again using \`${msg.guild.settings.get('prefix')}enable <command>\``);
  }
};