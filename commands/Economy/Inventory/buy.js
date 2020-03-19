const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const numberFormatter = require('number-formatter');

const items = require('../../../config/items/store_items.json');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Buy an item from the store.',
      hidden: true,
      usage: '[item:str] [amount:num|m|max|a|all]',
      usageDelim: ' ',
      runIn: ['text'],
    });
  }

  async run(msg, params) {
    const item = params[0];
    const rawAmount = params[1];

    const toFirstCase = function(str) {
      str = str.toLowerCase().split(' ');
      str[0] = str[0].charAt(0).toUpperCase() + str[0].slice(1);
      return str.join(' ');
    };

    const buyingItem = items[item];

    if (!Object.keys(items).includes(item)) return msg.send('No (valid) item specified');
    if (buyingItem.price > msg.author.settings.get('balance')) return msg.send('Insufficient funds');
    if (msg.author.settings.get(buyingItem.statistics.key) >= buyingItem.statistics.max) return msg.send('Already maxed');

    // define what amount to buy
    let amount;
    const timesCanBuy = Math.floor(msg.author.settings.balance / buyingItem.price);
    if (!rawAmount) {amount = 1;}
    else if (typeof rawAmount === 'string') {amount = timesCanBuy;}
    else {amount = rawAmount;}
    if (amount > timesCanBuy) throw msg.send('Insufficient funds');

    msg.author.settings.update('balance', msg.author.settings.get('balance') - buyingItem.price * amount);
    msg.author.settings.update(buyingItem.statistics.key, msg.author.settings.get(buyingItem.statistics.key) + buyingItem.statistics.increaser * amount);

    msg.send(
      new MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setColor('GREEN')
        .setTimestamp()
        .setDescription([`» ${buyingItem.statistics.friendlyname}: ${msg.author.settings.get(buyingItem.statistics.key)}${buyingItem.statExtra ? buyingItem.statExtra : ''} > ${msg.author.settings.get(buyingItem.statistics.key) + buyingItem.statistics.increaser * amount}${buyingItem.statExtra ? buyingItem.statExtra : ''}`,
          `» Price: ${msg.guild.settings.get('currency')}**${numberFormatter('#,##0.', buyingItem.price * amount)}**`].join('\n'))
        .setTitle(`<:ds_greentick:591919521598799872> ${buyingItem.buytitle ? buyingItem.buytitle : toFirstCase(item)} successfully bought!`),
    );
  }

};