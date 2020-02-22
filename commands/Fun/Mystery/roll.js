const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Roll a dice.',
      cooldown: 2,
      aliases: ['dice'],
    });
  }

  async run(message) {
    message.channel.send(`You rolled a dice and it said ${Math.ceil(Math.random() * 6)}`);
  }

};