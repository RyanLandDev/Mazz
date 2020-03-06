const { Command } = require('klasa');
const responses = require('../../../config/8ball_responses.json');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Ask the magic 8ball a question.',
      aliases: ['8b'],
      usage: '<Question:str{3,200}>',
      cooldown: 3,
    });
  }

  async run(message) {
    message.channel.send(':8ball: | ' + responses[Math.round(Math.random() * responses.length)]);
  }

};