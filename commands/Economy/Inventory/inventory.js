const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const items = require('../../../config/items/inv_items.json');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check your backpack for items.',
      cooldown: 5,
      runIn: ['text'],
      aliases: ['inv'],
    });
  }

  async run(msg) {
    const userItems = msg.author.settings.items;

    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setAuthor(msg.author.username + '\'s inventory', msg.author.avatarURL());

    for (let i = 0; i < userItems.length; i++) {
      for (let i2 = 0; i2 < Object.keys(items).length - 1; i2++) {
        const item = items[Object.keys(items)[i2 + 1]];
        const summary = item.summary.replace(/{currency}/gi, msg.guild.settings.get('currency'));
        if (item.codename === userItems[i]) Embed.addField('\u200b', `${item.title}${msg.author.settings.activeItems.includes(item.codename) ? '**[ACTIVE]**' : ''}\n${summary}`, true);
      }
    }

    if (userItems.length === 0) Embed.addField('\u200b', '(Empty)'); else Embed.addField('\u200b', `Use \`${msg.guild.settings.prefix}use <item>\` to use one of the items.`);

    msg.send(Embed);
  }
};