const { Finalizer } = require('klasa');

module.exports = class extends Finalizer {
  constructor(...args) {
    super(...args, {
    });
  }

  async run(message) {
    const balDifference = message.author.settings.get('balance') - message.author.settings.get('oldBal');
    if (balDifference <= 0) return;
    let base;
    if (message.author.settings.get('activeContacts').includes('uncleg')) base = 1; else base = 0;
    const multiplier = base + message.author.settings.get('rebirth') * 0.1;
    message.author.settings.update('balance', message.author.settings.get('balance') + Math.floor(balDifference * multiplier));
  }
};