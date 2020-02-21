const { Command } = require('klasa');
const responses = require('../../config/8ball_responses.json').main;

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Ask the magic 8ball a question.',
      aliases: ['8b'],
      usage: '<Question:str{3,200}>',
    });
  }

  async run(message) {
    const randomIndex = Math.round(Math.random() * responses.length);
    message.channel.send(responses[randomIndex]);
  }

};

//
//
//
//
//
//
//
//
//
//
//