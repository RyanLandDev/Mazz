const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const items = require('../../../config/items/inv_items.json');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Use one of the items in your inventory.',
      runIn: ['text'],
      cooldown: 5,
      usage: '<item:str>',
    });
  }

  async run(msg, params) {
    const userItems = msg.author.settings.items;
    let itemUsed;
    for (let i = 1; i < items.length; i++) {
      const item = items[i];
      if (item.codename === params[0] && userItems.includes(item.codename)) itemUsed = item;
    }
    if (!itemUsed) throw msg.send('You don\'t have this item or it doesn\'t exist');

    msg.author.settings.update('items', itemUsed.codename, { action: 'remove' });
    msg.author.settings.update(itemUsed.statistics.key, itemUsed.statistics.increaser + msg.author.settings.get(itemUsed.statistics.key));

    const embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setColor('GREEN')
      .setDescription(`You used ${itemUsed.title}`);
    msg.send(embed);
  }
};