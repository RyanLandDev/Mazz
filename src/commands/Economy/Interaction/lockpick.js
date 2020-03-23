const { Command } = require('klasa');
const moment = require('moment');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Lockpick another user.',
      usage: '<member:user>',
      cooldown: 9000,
      runIn: ['text'],
      enabled: false,
    });
  }

  async run(msg, params) {
    const user = params[0];
    msg.delete();
    const start = parseInt(moment().format('x'));
    const lockpick = [{}];
    msg.author.send('**Lockpicking in progress** | Starting')
      .catch(() => msg.send('You have your DMs disabled, please enable them to be able to lockpick'));

    Update() {
    }
  }
};