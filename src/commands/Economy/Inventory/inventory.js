const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
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
      if (newMember) member = newMember.user;
      User = member;
    }

    const { settings } = this.client.users.cache.get(User.id);
    await settings.sync();

    const userItems = User.settings.items.slice();
    const activeItems = User.settings.activeItems.slice();

    const counts = {};
    userItems.forEach(function(x) { counts[x] = (counts[x] || 0) + 1; });

    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setAuthor(User.username + '\'s inventory', User.avatarURL());

    // items in inventory
    const fieldsDone = [];
    for (let i = 0; i < userItems.length; i++) {
      for (let i2 = 0; i2 < Object.keys(items).length - 1; i2++) {
        const item = items[Object.keys(items)[i2 + 1]];
        const summary = item.summary.replace(/{currency}/gi, msg.guild.settings.get('currency'));
        item.codename = item.codename.replace(' ', '_');
        if (item.codename === userItems[i] && !fieldsDone.includes(item.codename)) Embed.addField('\u200b', `${item.title}${counts[item.codename] !== 1 ? ` x${counts[item.codename]}` : ''}\n${summary} \n\`${msg.guild.settings.prefix}use ${item.codename}\``, true), fieldsDone.push(item.codename);
      }
    }
    // active items
    const activeList = [];
    for (let i = 0; i < activeItems.length; i++) {
      for (let i2 = 0; i2 < Object.keys(items).length - 1; i2++) {
        const item = items[Object.keys(items)[i2 + 1]];
        if (!item.temporary) continue;
        // time left
        let CDm, CDs;
        const RemainingS = Math.floor((item.temporaryTime - (parseInt(moment().format('x')) - parseInt(User.settings.get(item.statistics.key)))) / 1000);
        const CDh = Math.floor(RemainingS / 3600);
        if (CDh === 0) CDm = Math.floor(RemainingS / 60); else CDm = Math.floor(RemainingS / 60 - (CDh * 60));
        if (CDm === 0) CDs = RemainingS; else CDs = Math.round(RemainingS - ((CDh * 3600) + (CDm * 60)));
        if (item.codename === activeItems[i]) activeList.push(item.title + ' | ' + `${CDh === 0 ? '' : `${CDh}h`}${CDm === 0 ? '' : `${CDm}m`}${CDs}s`);
      }
    }
    if (activeItems.length !== 0) Embed.addField('**Active Items**', activeList.join('\n'));
    if (userItems.length === 0) Embed.setDescription('(Empty)');
    msg.send(Embed);
  }
};