const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const items = require('../../../config/items/inv_items.json');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check your backpack for items.',
      cooldown: 5,
      runIn: ['text'],
      aliases: ['inv', 'bp', 'backpack'],
      usage: '[member:member|name:str]',
      usageDelim: ' ',
    });
  }

  async run(msg, params) {
    let member = params[0];
    let newMember, User;
    if (!params[0]) {User = msg.author;}
    else {
      if (typeof member === 'string') newMember = msg.guild.members.cache.find(m => m.displayName.toLowerCase().includes(member.toLowerCase()));
      if (!newMember && typeof member === 'string') newMember = msg.guild.members.cache.find(m => m.user.username.toLowerCase().includes(member.toLowerCase()));
      if (!newMember && typeof member === 'string') newMember = params[0];
      if (newMember) member = newMember;
      User = member;
    }

    const { settings } = this.client.users.cache.get(User.id);
    await settings.sync();

    const userItems = User.settings.items.slice();

    const counts = {};
    userItems.forEach(function(x) { counts[x] = (counts[x] || 0) + 1; });

    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setAuthor(User.username + '\'s inventory', User.avatarURL());

    const fieldsDone = [];
    for (let i = 0; i < userItems.length; i++) {
      for (let i2 = 0; i2 < Object.keys(items).length - 1; i2++) {
        const item = items[Object.keys(items)[i2 + 1]];
        const summary = item.summary.replace(/{currency}/gi, msg.guild.settings.get('currency'));
        if (item.codename === userItems[i] && !fieldsDone.includes(item.codename)) Embed.addField('\u200b', `${item.title}${counts[item.codename] !== 1 ? ` x${counts[item.codename]}` : ''}${User.settings.activeItems.includes(item.codename) ? ' **[ACTIVE]**' : ''}\n${summary} \n\`${msg.guild.settings.prefix}use ${item.codename}\``, true), fieldsDone.push(item.codename);
      }
    }

    if (userItems.length === 0) Embed.setDescription('(Empty)');
    msg.send(Embed);
  }
};