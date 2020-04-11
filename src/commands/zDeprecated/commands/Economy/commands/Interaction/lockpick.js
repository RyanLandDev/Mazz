const { Command } = require('klasa');
const moment = require('moment');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Lockpick another user.',
      usage: '<member:user>',
      cooldown: 9000,
      runIn: ['text'],
    });
  }

  async run(msg, params) {
    const user = params[0];
    msg.delete();
    if (user === msg.author) throw msg.send('You can\'t lockpick yourself!');
    const start = parseInt(moment().format('x'));
    const lockpick = [];
    for (let i = 0; i < 5; i++) for (let j = 0; j < 7; j++) lockpick.push({ 'name': 'square', 'emoji': ':black_large_square:', 'row': i, 'column': j });
    console.log(lockpick);
    msg.author.send('**Lockpicking in progress** | Starting')
      .catch(() => msg.send('You have your DMs disabled, please enable them to be able to lockpick'));
  }
};
