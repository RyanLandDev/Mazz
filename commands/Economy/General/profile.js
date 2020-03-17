const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const numberFormatter = require('number-formatter');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Check your profile.',
      aliases: ['p', 'pf', 'balance', 'bal', 'money', 'wallet', 'cash'],
      usage: '[member:member]',
      runIn: ['text'],
    });
  }

  async run(msg, params) {
    let Member;
    if (params.length === 0) Member = msg.member; else Member = params[0];

    const Embed = new MessageEmbed()
      .setAuthor(Member.user.username, Member.user.avatarURL())
      .setTitle('Profile')
      .setColor('#0099FF')
      .setThumbnail(Member.user.avatarURL())
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
      .addField('**General**', ['**Level**: wip',
        '**Level XP**: wip',
        '**Progress**: wip\n',
        `**Wallet**: ${Member.user.settings.get('balance') < 0 ? '[In Debt]' : ''}${msg.guild.settings.get('currency')}${numberFormatter('#,##0.', Member.user.settings.get('balance'))}`,
        `**Bank**: ${msg.guild.settings.get('currency')}${numberFormatter('#,##0.', Member.user.settings.get('bankBalance'))}`].join('\n'), true)
      .addField('**Upgrades**', [`**Robbery Chance**: ${Member.user.settings.get('robChance')}%`,
        `**Robbery Cut**: ${Member.user.settings.get('robCut')}%`,
        `**Extra Robbery Chances**: ${Member.user.settings.get('robExtraChance')}%`,
        `**Bank Storage**: ${numberFormatter('#,##0.', Member.user.settings.get('bankStorage'))}/50,000`].join('\n'), true);
    msg.send(Embed);
  }
};