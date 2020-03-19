const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
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
    const { settings } = this.client.users.cache.get(msg.author.id);
    await settings.sync();

    const userItems = msg.author.settings.items.slice();
    let itemUsed;
    for (let i = 1; i < items.length; i++) {
      const item = items[i];
      if (item.codename === params[0].toLowerCase() && userItems.includes(item.codename)) itemUsed = item;
    }
    if (!itemUsed) throw msg.send('You don\'t have this item or it doesn\'t exist');

    if (typeof itemUsed.statistics.increaser === 'string') itemUsed.statistics.increaser = itemUsed.statistics.increaser.replace(/{time}/gi, moment().format('x'));
    msg.author.settings.update('items', itemUsed.codename, { action: 'remove' });
    msg.author.settings.update(itemUsed.statistics.key, itemUsed.statistics.set ? itemUsed.statistics.increaser : itemUsed.statistics.increaser + msg.author.settings.get(itemUsed.statistics.key));

    if (msg.author.settings.activeItems.includes(itemUsed.codename)) throw msg.send('This item is already active');
    const activeItemsArray = msg.author.settings.activeItems.slice();
    activeItemsArray.push(itemUsed.codename);
    if (itemUsed.temporary && !msg.author.settings.activeItems.includes(itemUsed.codename)) await msg.author.settings.update('activeItems', activeItemsArray, { action: 'overwrite' });
    console.log(msg.author.settings.activeItems);
    console.log(activeItemsArray);

    const embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setColor('GREEN')
      .setDescription(`You used ${itemUsed.title}`);
    msg.send(embed);
  }
};