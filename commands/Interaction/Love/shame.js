const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Rings a bell on the server shaming the mentioned person.',
      usage: '<member:user>',
      cooldown: 300,
    });
  }

  run(msg, [member]) {
    if (member.username.includes('@everyone') || member.username.includes('@here')) return msg.sendMessage('I\'m smarter');
    return msg.sendMessage(`🔔 SHAME 🔔 ${member} 🔔 SHAME 🔔`);
  }

};