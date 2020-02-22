const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Generate a random number.',
      usageDelim: ' ',
      usage: '<Min:num> <Max:num>',
      cooldown: 3,
    });
  }

  async run(message, params) {
    if (params[0] > params[1]) return message.channel.send('The min can\'t be higher than the max!');
    message.channel.send('The magic number is **' + (Math.round(Math.random() * (params[1] - params[0])) + params[0]) + '**');
  }

};