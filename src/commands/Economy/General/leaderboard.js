const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check the leaderboards.',
      usage: '[wallet|bank|level|rebirth]',
      usageDelim: ' ',
      runIn: ['text'],
      aliases: ['lb', 'lead', 'top'],
    });
  }

  async run(msg, params) {
    const toFirstCase = function(str) {
      str = str.toLowerCase().split(' ');
      str[0] = str[0].charAt(0).toUpperCase() + str[0].slice(1);
      return str.join(' ');
    };

    let type;
    if (params[0]) type = params[0]; else type = 'wallet';

    let userArray;
    if (type === 'wallet') {
      userArray = Array.from(msg.guild.members.values());
      userArray = msg.guild.members.array();
      userArray.sort(function(a, b) {
        return b.user.settings.get('balance') - a.user.settings.get('balance');
      });
      userArray.splice(10, msg.guild.members.size);
      for (let i = 0; i < userArray.length; i++) userArray[i] = `${i === 0 ? ' 🥇' : ''}${i === 1 ? ' 🥈' : ''}${i === 2 ? ' 🥉' : ''}${i > 2 ? `${i + 1}.` : ''} **${userArray[i].user.username}** - ${msg.guild.settings.get('currency')}${userArray[i].user.settings.get('balance')}`;
    }
    if (type === 'bank') {
      userArray = Array.from(msg.guild.members.values());
      userArray.sort(function(a, b) {
        return b.user.settings.get('bankBalance') - a.user.settings.get('bankBalance');
      });
      userArray.splice(10, msg.guild.members.size);
      for (let i = 0; i < userArray.length; i++) userArray[i] = `${i === 0 ? ' 🥇' : ''}${i === 1 ? ' 🥈' : ''}${i === 2 ? ' 🥉' : ''}${i > 2 ? `${i + 1}.` : ''} **${userArray[i].user.username}** - ${msg.guild.settings.get('currency')}${userArray[i].user.settings.get('bankBalance')}`;
    }
    if (type === 'level') {
      userArray = Array.from(msg.guild.members.values());
      userArray.sort(function(a, b) {
        return b.user.settings.get('level') - a.user.settings.get('level');
      });
      userArray.splice(10, msg.guild.members.size);
      for (let i = 0; i < userArray.length; i++) if (userArray[i].user.settings.get('level') > 0) userArray[i] = `${i === 0 ? ' 🥇' : ''}${i === 1 ? ' 🥈' : ''}${i === 2 ? ' 🥉' : ''}${i > 2 ? `${i + 1}.` : ''} **${userArray[i].user.username}** - Level ${userArray[i].user.settings.get('level')}`; else userArray[i] = '';
    }
    if (type === 'rebirth') {
      userArray = Array.from(msg.guild.members.values());
      userArray.sort(function(a, b) {
        return b.user.settings.get('rebirth') - a.user.settings.get('rebirth');
      });
      if (userArray.length > 10) userArray.splice(10, msg.guild.members.size);
      for (let i = 0; i < userArray.length; i++) if (userArray[i].user.settings.get('rebirth') > 0) userArray[i] = `${i === 0 ? ' 🥇' : ''}${i === 1 ? ' 🥈' : ''}${i === 2 ? ' 🥉' : ''}${i > 2 ? `${i + 1}.` : ''} **${userArray[i].user.username}** - Rebirth ${userArray[i].user.settings.get('rebirth')}`; else userArray[i] = '';
    }

    const embed = new MessageEmbed()
      .setAuthor(msg.guild.name, msg.guild.iconURL())
      .setColor('#0099FF')
      .setTitle(`${toFirstCase(type)} Leaderboard`)
      .setTimestamp()
      .setThumbnail(msg.guild.iconURL())
      .setDescription(userArray.join('\n'));
    msg.send(embed);
  }
};