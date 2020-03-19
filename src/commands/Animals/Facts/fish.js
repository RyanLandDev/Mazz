const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'blup',
    });
  }

  async run(msg) {
    msg.send('🐟🐠🐡');
  }

};