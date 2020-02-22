const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Rings a bell on the server shaming the mentioned person.',
      usage: '<User:user>',
      cooldown: 300,
    });
  }

  run(msg, [User]) {
    if (User.username.includes('@everyone') | User.username.includes('@here')) return msg.sendMessage('I\'m smarter');
    return msg.sendMessage(`🔔 SHAME 🔔 ${User} 🔔 SHAME 🔔`);
  }

};