const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const numberFormatter = require('number-formatter');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check your profile.',
      aliases: ['p', 'pf', 'balance', 'bal', 'money', 'wallet', 'cash', 'rank', 'level'],
      usage: '[member:member]',
      runIn: ['text'],
    });
  }

  async run(msg, params) {
    let Member;
    if (params.length === 0) Member = msg.member; else Member = params[0];

    // level progress
    const xpProgress = Math.floor(Member.user.settings.levelXP / (5 * (Member.user.settings.level ^ 2) + 50 * Member.user.settings.level + 100) * 10);
    let xpProgressString = '';
    for (let i = 0; i < xpProgress; i++) xpProgressString = xpProgressString + '■';
    for (let i = 0; i < 10 - xpProgress; i++) xpProgressString = xpProgressString + '□';

    const Embed = new MessageEmbed()
      .setAuthor(Member.user.username, Member.user.avatarURL())
      .setTitle('Profile')
      .setColor('#0099FF')
      .setThumbnail(Member.user.avatarURL())
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.avatarURL())
      .addField('**General**', [`**Level**: ${Member.user.settings.level}`,
        `**Level XP**: ${Member.user.settings.levelXP}/${5 * (Member.user.settings.level ^ 2) + 50 * Member.user.settings.level + 100}`,
        `**Progress**: ${xpProgressString}\n`,
        `**Wallet**: ${Member.user.settings.get('balance') < 0 ? '[In Debt]' : ''}${msg.guild.settings.get('currency')}${numberFormatter('#,##0.', Member.user.settings.get('balance'))}`,
        `**Bank**: ${msg.guild.settings.get('currency')}${numberFormatter('#,##0.', Member.user.settings.get('bankBalance'))}\n`,
        `**Rebirth**: ${Member.user.settings.rebirth ? Member.user.settings.rebirth : '0'}`].join('\n'), true)
      .addField('**Upgrades**', [`**Robbery Chance**: ${Member.user.settings.get('robChance')}%`,
        `**Robbery Cut**: ${Member.user.settings.get('robCut')}%`,
        `**Extra Robbery Chances**: ${Member.user.settings.get('robExtraChance')}%`,
        `**Bank Storage**: ${numberFormatter('#,##0.', Member.user.settings.get('bankStorage'))}/50,000`].join('\n'), true);
    msg.send(Embed);
  }
};