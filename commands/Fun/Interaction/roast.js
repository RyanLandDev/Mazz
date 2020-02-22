const { Command } = require('klasa');
const responses = require('../../../config/roast_responses.json').main;

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Roast someone. Or yourself. Weirdo.',
      cooldown: 3,
    });
  }

  async run(message) {
    message.channel.send(responses[Math.round(Math.random() * responses.length)]);
  }

};