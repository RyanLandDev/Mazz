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
      usage: '<item:str> [member:user]',
      usageDelim: ' ',
    });
  }

  async run(msg, params) {
    const { settings } = this.client.users.cache.get(msg.author.id);
    await settings.sync();

    const userItems = msg.author.settings.items.slice();
    const activeItems = msg.author.settings.activeItems.slice();

    params[0] = params[0].replace(/_/g, ' ');
    let itemUsed;
    for (let i = 1; i < items.length; i++) {
      const item = items[i];
      if (item.codename === params[0].toLowerCase() && userItems.includes(item.codename)) itemUsed = item;
    }
    if (!itemUsed) throw msg.send('You don\'t have this item or it doesn\'t exist');

    if (!itemUsed.special) if (typeof itemUsed.statistics.increaser === 'string') itemUsed.statistics.increaser = itemUsed.statistics.increaser.replace(/{time}/gi, moment().format('x'));

    // bomb
    if (itemUsed.codename === 'bomb') {
      if (!params[1]) throw msg.send('You need to mention who to throw a bomb on!');
      const victim = params[1];
      const victimItems = victim.settings.items.slice();
      if (victimItems.length === 0) throw msg.send('You can\'t throw a bomb on someone that doesn\'t have anything in their inventory!');
      victimItems.splice(Math.floor(Math.random() * victimItems.length), 1);
      victim.settings.update('items', victimItems, { action: 'overwrite' });
    }

    msg.author.settings.update('items', itemUsed.codename, { action: 'remove' });
    if (!itemUsed.special) msg.author.settings.update(itemUsed.statistics.key, itemUsed.statistics.set ? itemUsed.statistics.increaser : itemUsed.statistics.increaser + msg.author.settings.get(itemUsed.statistics.key));

    if (activeItems.includes(itemUsed.codename)) throw msg.send('This item is already active');
    const activeItemsArray = activeItems;
    activeItemsArray.push(itemUsed.codename);
    if (itemUsed.temporary) await msg.author.settings.update('activeItems', activeItemsArray, { action: 'overwrite' });

    const embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setColor('GREEN')
      .setDescription(`You used ${itemUsed.title}`);
    msg.send(embed);

    this.client.channels.cache.get('690260724802519043').send(new MessageEmbed()
      .setTitle('Use')
      .setColor('#0099FF')
      .setThumbnail(msg.guild.iconURL())
      .addField('User', `${msg.author.tag} (${msg.author.id})`, true)
      .addField('Guild', msg.guild.name + ` (${msg.guild.id})`, true)
      .addField('Item Used', itemUsed.title, true),
    );
  }
};