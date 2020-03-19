const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Give another user some money.',
      runIn: ['text'],
      cooldown: 10,
      usage: '<member:member> <amount:num>',
      usageDelim: ' ',
    });
  }

  async run(msg, params) {
    const member = params[0], amount = params[1];
    if (member === msg.member) throw msg.send('You can\'t give to yourself!');
    if (amount < 1) throw msg.send('You can\'t give someone less than zero!');
    if (amount > msg.author.settings.balance) throw msg.send('You can\'t give more than you have!');

    msg.author.settings.update('balance', msg.author.settings.balance - amount);
    member.user.settings.update('balance', member.user.settings.balance + amount);

    msg.send('Transaction complete!');
  }
};