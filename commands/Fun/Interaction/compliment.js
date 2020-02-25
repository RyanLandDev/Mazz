const { Command } = require('klasa');
const responses = require('../../../config/compliment_responses.json').main;

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Give a heart-warming compliment.',
      cooldown: 3,
    });
  }

  async run(message) {
    message.channel.send(':smiling_face_with_3_hearts: | ' + responses[Math.round(Math.random() * responses.length)]);
  }

};