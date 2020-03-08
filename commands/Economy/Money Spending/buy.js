const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

const items = require('../../../config/store/store_items.json');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Buy an item from the store.',
      hidden: true,
      usage: '[item:str]',
    });
  }

  async run(msg, [item]) {
    const toFirstCase = function(str) {
      str = str.toLowerCase().split(' ');
      str[0] = str[0].charAt(0).toUpperCase() + str[0].slice(1);
      return str.join(' ');
    };

    const buyingItem = items[item];

    if (!Object.keys(items).includes(item)) return msg.send('No (valid) item specified');
    if (buyingItem.price > msg.author.settings.get('balance')) return msg.send('Insufficient funds');
    if (msg.author.settings.get(buyingItem.statistics.key) === buyingItem.statistics.max) return msg.send('Already maxed');

    msg.author.settings.update('balance', msg.author.settings.get('balance') - buyingItem.price);
    msg.author.settings.update(buyingItem.statistics.key, msg.author.settings.get(buyingItem.statistics.key) + buyingItem.statistics.increaser);

    msg.send(
      new MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setColor('GREEN')
        .setTimestamp()
        .setDescription([`» ${buyingItem.statistics.friendlyname}: ${msg.author.settings.get(buyingItem.statistics.key)}${buyingItem.statExtra ? buyingItem.statExtra : ''} > ${msg.author.settings.get(buyingItem.statistics.key) + buyingItem.statistics.increaser}${buyingItem.statExtra ? buyingItem.statExtra : ''}`,
          `» Price: ${msg.guild.settings.get('currency')}**${buyingItem.price}**`].join('\n'))
        .setTitle(`<:ds_greentick:591919521598799872> ${buyingItem.buytitle ? buyingItem.buytitle : toFirstCase(item)} successfully bought!`),
    );
  }

};