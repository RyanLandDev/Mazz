const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check on the bank.',
    });
  }

  async run(msg) {
  }
};