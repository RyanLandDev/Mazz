const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Enable a command.',
      usage: '<command:command>',
      guarded: true,
      runIn: ['text'],
      // server admin
      permissionLevel: 24,
    });
  }

  async run(msg, [command]) {
    if (command.guarded === true) throw msg.send('This command cannot be enabled.');

    const current = msg.guild.settings.get('disabledCommands');
    if (!current.includes(command.name)) throw msg.send('This command is already enabled');

    msg.guild.settings.update('disabledCommands', command.name, { arrayAction: 'remove' });
    msg.send(`The \`${command.name}\` command has been enabled!\nYou can disable it again using \`${msg.guild.settings.get('prefix')}disable <command>\``);
  }
};