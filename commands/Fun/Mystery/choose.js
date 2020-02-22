const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Pick something.',
      usageDelim: ' ',
      usage: '<ThingsToPickBetween:str> [...]',
      cooldown: 3,
      aliases: ['pick'],
    });
  }

  async run(message, params) {
    const itemPicked = params[Math.round(Math.random() * params.length)];
    message.channel.send('I have magically chosen **' + itemPicked + '**');
  }

};