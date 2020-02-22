const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Do an epic kickflip.',
      cooldown: 2,
    });
  }

  async run(message) {
    function ifClamp(min, mid, max) {
      if (min < mid && mid < max) {
        return mid;
      }
      else if (mid < min) {
        return min;
      }
      else if (max < mid) {
        return max;
      }
    }
    message.channel.send(`You did a kickflip! (${ifClamp(2, Math.round(Math.random() * 100), 100)} points)`);
  }

};