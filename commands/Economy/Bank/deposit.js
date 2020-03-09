const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Deposit money to your bank account.',
      aliases: ['dep', 'dp'],
    });
  }

  async run(msg) {
  }
};