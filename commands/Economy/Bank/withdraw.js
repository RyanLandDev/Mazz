const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Withdraw money from your bank account.',
      aliases: ['with', 'wd'],
    });
  }

  async run(msg) {
  }
};