const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check the leaderboards.',
      usage: '[wallet|bank|level|rebirth]',
      usageDelim: ' ',
      runIn: ['text'],
      aliases: ['lb', 'lead'],
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
      userArray = msg.guild.members.cache.array();
      userArray.sort(function(a, b) {
        return b.user.settings.balance - a.user.settings.balance;
      });
      userArray.splice(10, msg.guild.members.cache.size);
      for (let i = 0; i < userArray.length; i++) userArray[i] = `${i === 0 ? ' 🥇' : ''}${i === 1 ? ' 🥈' : ''}${i === 2 ? ' 🥉' : ''}${i > 2 ? `${i + 1}.` : ''} **${userArray[i].user.username}** - ${msg.guild.settings.currency}${userArray[i].user.settings.balance}`;
    }
    if (type === 'bank') {
      userArray = msg.guild.members.cache.array();
      userArray.sort(function(a, b) {
        return b.user.settings.bankBalance - a.user.settings.bankBalance;
      });
      userArray.splice(10, msg.guild.members.cache.size);
      for (let i = 0; i < userArray.length; i++) userArray[i] = `${i === 0 ? ' 🥇' : ''}${i === 1 ? ' 🥈' : ''}${i === 2 ? ' 🥉' : ''}${i > 2 ? `${i + 1}.` : ''} **${userArray[i].user.username}** - ${msg.guild.settings.currency}${userArray[i].user.settings.bankBalance}`;
    }
    if (type === 'level') {
      userArray = msg.guild.members.cache.array();
      userArray.sort(function(a, b) {
        return b.user.settings.level - a.user.settings.level;
      });
      userArray.splice(10, msg.guild.members.cache.size);
      for (let i = 0; i < userArray.length; i++) if (userArray[i].user.settings.level > 0) userArray[i] = `${i === 0 ? ' 🥇' : ''}${i === 1 ? ' 🥈' : ''}${i === 2 ? ' 🥉' : ''}${i > 2 ? `${i + 1}.` : ''} **${userArray[i].user.username}** - Level ${userArray[i].user.settings.level}`; else userArray[i] = '';
    }
    if (type === 'rebirth') {
      userArray = msg.guild.members.cache.array();
      userArray.sort(function(a, b) {
        return b.user.settings.rebirth - a.user.settings.rebirth;
      });
      userArray.splice(10, msg.guild.members.cache.size);
      for (let i = 0; i < userArray.length; i++) if (userArray[i].user.settings.rebirth > 0) userArray[i] = `${i === 0 ? ' 🥇' : ''}${i === 1 ? ' 🥈' : ''}${i === 2 ? ' 🥉' : ''}${i > 2 ? `${i + 1}.` : ''} **${userArray[i].user.username}** - Rebirth ${userArray[i].user.settings.rebirth}`; else userArray[i] = '';
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