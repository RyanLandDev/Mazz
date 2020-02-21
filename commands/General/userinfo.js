const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: '',
      enabled: false,
      guarded: true,
    });
  }
  async run(message) {
    // here
  }

};