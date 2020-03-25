const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

  constructor(...args) {
    super(...args, {
    });
  }

  async run(message) {
    message.author.settings.update('oldBal', message.author.settings.get('balance'));
  }
};