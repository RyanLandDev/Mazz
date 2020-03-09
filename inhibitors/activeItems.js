const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
  constructor(...args) {
    super(...args, {
    });
  }

  async run(message, command) {
    // Will check if items have expired and if so, unactivate them.
    // Uncle G
  }
};