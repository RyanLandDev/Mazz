const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Toggle the visibility of level up messages.',
      // server admin
      permissionLevel: 24,
      runIn: ['text'],
      guarded: true,
    });
  }

  async run(msg) {
    if (msg.guild.settings.get('levelMsg')) msg.guild.settings.update('levelMsg', false), msg.send('Level up messages have been disabled!'); else msg.guild.settings.update('levelMsg', true), msg.send('Level up messages have been enabled!');
  }
};