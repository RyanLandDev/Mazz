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
    if (!buyingItem.item) if (msg.author.settings.get(buyingItem.statistics.key) >= buyingItem.statistics.max) return msg.send('Already maxed');

    // define what amount to buy
    let amount;
    const timesCanBuy = Math.floor(msg.author.settings.get('balance') / buyingItem.price);
    if (!rawAmount) {amount = 1;}
    else if (typeof rawAmount === 'string') {amount = timesCanBuy;}
    else {amount = rawAmount;}
    amount = Math.floor(amount);
    if (amount < 1) throw msg.send('You can\'t buy negative amounts!');
    if (amount > timesCanBuy) throw msg.send('Insufficient funds');
    if (!buyingItem.item) if ((msg.author.settings.get(buyingItem.statistics.key) + buyingItem.statistics.increaser * amount) >= buyingItem.statistics.max) amount = (buyingItem.statistics.max - msg.author.settings.get(buyingItem.statistics.key)) / buyingItem.price;

    msg.author.settings.update('balance', msg.author.settings.get('balance') - buyingItem.price * amount);
    if (buyingItem.item) {
      const userItems = msg.author.settings.get('items').slice();
      userItems.push(item);
      msg.author.settings.update('items', userItems, { arrayAction: 'overwrite' });
    }
    else {msg.author.settings.update(buyingItem.statistics.key, msg.author.settings.get(buyingItem.statistics.key) + buyingItem.statistics.increaser * amount);}

    let descArray;
    if (buyingItem.item) descArray = []; else descArray = [`» ${buyingItem.statistics.friendlyname}: ${msg.author.settings.get(buyingItem.statistics.key)}${buyingItem.statExtra ? buyingItem.statExtra : ''} > ${msg.author.settings.get(buyingItem.statistics.key) + buyingItem.statistics.increaser * amount}${buyingItem.statExtra ? buyingItem.statExtra : ''}`];
    descArray.push(`» Price: ${msg.guild.settings.get('currency')}**${numberFormatter('#,##0.', buyingItem.price * amount)}**`);
    msg.send(
      new MessageEmbed()
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setColor('GREEN')
        .setTimestamp()
        .setDescription(descArray.join('\n'))
        .setTitle(`<:ds_greentick:591919521598799872> ${buyingItem.buytitle ? buyingItem.buytitle : toFirstCase(item)} successfully bought!`),
    );
    this.client.channels.get('690260681831874658').send(new MessageEmbed()
      .setTitle('Buy')
      .setColor('#0099FF')
      .setThumbnail(msg.guild.iconURL())
      .addField('Price', msg.guild.settings.get('currency') + (buyingItem.price * amount), true)
      .addField('Amount Bought', amount, true)
      .addField('Buyer', `${msg.author.tag} (${msg.author.id})`, true)
      .addField('Buyer\'s Original Balance', msg.author.settings.get('balance'), true)
      .addField('Buyer\'s Final Balance', msg.author.settings.get('balance') - buyingItem.price * amount, true)
      .addField('Guild', msg.guild.name + ` (${msg.guild.id})`, true)
      .addField('Item Bought', item, true),
    );
  }

};
