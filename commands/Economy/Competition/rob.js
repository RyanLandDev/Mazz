const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Rob someone.',
      usage: '<member:user>',
      cooldown: 14400,
      runIn: ['text'],
    });
  }

  async run(msg, [member]) {
    if (msg.author.settings.get('balance') < 500) return msg.send(`You need at least ${msg.guild.settings.get('currency')}**500** to rob someone!`);
    if (member === msg.author) return msg.send('You can\'t rob yourself!');
    if (member.settings.get('balance') < 250) return msg.send('They don\'t have a well sized wallet, not worth it man');

    let min = 1;
    let max = 100 + msg.author.settings.get('robExtraChance');
  }
};