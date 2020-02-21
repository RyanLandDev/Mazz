const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'This is a epic gamer easter egg. Touch this and I will hunt you down',
      enabled: false,
      guarded: true,
    });
  }

  async run(message, {
  }

};