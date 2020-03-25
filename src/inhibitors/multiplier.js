const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

  constructor(...args) {
    super(...args, {
    });
  }

  async run(message) {
    // Be careful, this is dangerous, doing multiple settings updates in inhibitors can lead
    // to serious race-conditions and potential parallelism issues
    await message.author.settings.update('oldBal', message.author.settings.get('balance'));
  }
};