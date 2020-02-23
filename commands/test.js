const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Epic test',
      aliases: ['test1'],
    });
  }

  async run(message) {
    message.channel.send(Math.round(Math.random() * (1 - 100) + 100));
  }
};