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
    });
  }

  async run(msg) {
    const userItems = msg.author.settings.items;

    const counts = {};
    userItems.forEach(function(x) { counts[x] = (counts[x] || 0) + 1; });

    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setAuthor(msg.author.username + '\'s inventory', msg.author.avatarURL());

    const fieldsDone = [];
    for (let i = 0; i < userItems.length; i++) {
      for (let i2 = 0; i2 < Object.keys(items).length - 1; i2++) {
        const item = items[Object.keys(items)[i2 + 1]];
        const summary = item.summary.replace(/{currency}/gi, msg.guild.settings.get('currency'));
        if (item.codename === userItems[i] && !fieldsDone.includes(item.codename)) Embed.addField('\u200b', `${item.title}${counts[item.codename] !== 1 ? ` x${counts[item.codename]}` : ''}${msg.author.settings.activeItems.includes(item.codename) ? ' **[ACTIVE]**' : ''}\n${summary} \n\`${msg.guild.settings.prefix}use ${item.codename}\``, true), fieldsDone.push(item.codename);
      }
    }

    if (userItems.length === 0) Embed.addField('\u200b', '(Empty)'); else Embed.addField('\u200b', `Use \`${msg.guild.settings.prefix}use <item>\` to use one of the items.`);
    msg.send(Embed);
  }
};