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

    const current = msg.guild.settings.get('disabledCommands');
    current.push(command.name);

    msg.guild.settings.update('disabledCommands', current);
    msg.send(`The \`${command.name}\` command has been disabled!\nYou can enable it again using \`${msg.guild.settings.get('prefix')}enable <command>\``);
  }
};