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
    if (msg.author.settings.get('balance') < 500) throw msg.send(`You need at least ${msg.guild.settings.get('currency')}**500** to rob someone!`);
    if (member === msg.author) throw msg.send('You can\'t rob yourself!');
    if (member.settings.get('balance') < 250) throw msg.send('They don\'t have a well sized wallet, not worth it man');

    const min = 1;
    const max = 100 + msg.author.settings.get('robExtraChance');
    const chance = Math.round(Math.random() * (max - min) + min);

    if (chance > member.settings.get('robChance')) {
      // Success
      const moneyEarnt = Math.round(msg.author.settings.get('robCut') / 100 * member.settings.get('balance'));
      msg.author.settings.update('balance', msg.author.settings.get('balance') + moneyEarnt);
      member.settings.update('balance', member.settings.get('balance') - moneyEarnt);
      return msg.send('Robbery successful! You have stolen ' + msg.guild.settings.get('currency') + '**' + moneyEarnt + '**');
    }
    else {
      // Fail
      const moneyLost = Math.round(20 / 100 * msg.author.settings.get('balance'));
      msg.author.settings.update('balance', msg.author.settings.get('balance') - moneyLost);
      member.settings.update('balance', member.settings.get('balance') + moneyLost);
      return msg.send('Robbery failed.. You have lost ' + msg.guild.settings.get('currency') + '**' + moneyLost + '**');
    }
  }
};