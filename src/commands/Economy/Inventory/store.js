// require modules
const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const numberFormatter = require('number-formatter');

// require store information
const items = require('../../../config/items/store_items.json');
const pages = require('../../../config/items/store_pages.json');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'If you\'ve got some money left over, check out this!',
      aliases: ['shop'],
      cooldown: 4,
      runIn: ['text'],
      usage: `[page:num{1,${pages.length}}]`,
    });
  }

  async run(msg, params) {
    // define what page should be shown
    let page;
    if (params.length === 0) page = 1; else page = params[0];

    // base embed
    const Embed = new MessageEmbed()
      .setTitle('Store')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setColor('#0099FF')
      .setFooter(`${pages[page - 1].name} - Page ${page}/${pages.length}`)
      .setDescription(`You currently have ${msg.guild.settings.get('currency')}**${numberFormatter('#,##0.', msg.author.settings.get('balance'))}**.`);

    // add items
    for (let i = 1; i < Object.keys(items).length; i++) {
      const item = items[Object.keys(items)[i]];
      let secondStat;
      if (!item.item) {
        if (msg.author.settings.get(item.statistics.key) + item.statistics.increaser) secondStat = msg.author.settings.get(item.statistics.key) + item.statistics.increaser; else secondStat = item.statistics.increaser;
        if (item.statExtra) secondStat = secondStat + item.statExtra;
        if (msg.author.settings.get(item.statistics.key) >= item.statistics.max && !item.reverse) secondStat = 'MAX';
        if (msg.author.settings.get(item.statistics.key) <= item.statistics.max && item.reverse) secondStat = 'MAX';
        if (typeof secondStat === 'number') secondStat = numberFormatter('#,##0.', secondStat);
      }
      if (items[Object.keys(items)[i]].page === page) {
        const fieldValueArray = [item.title, item.summary];
        if (!item.item) {
          fieldValueArray.push(`» ${item.statistics.friendlyname}: ${numberFormatter('#,##0.', msg.author.settings.get(item.statistics.key) ? msg.author.settings.get(item.statistics.key) : '0')}${item.statExtra ? item.statExtra : ''} > ${secondStat}`);
          if (msg.author.settings.get(item.statistics.key) < item.statistics.max && !item.reverse) fieldValueArray.push(`» Price: ${msg.guild.settings.get('currency')}**${numberFormatter('#,##0.', item.price)}** \`${msg.guild.settings.get('prefix')}buy ${Object.keys(items)[i]}\``);
          if (msg.author.settings.get(item.statistics.key) > item.statistics.max && item.reverse) fieldValueArray.push(`» Price: ${msg.guild.settings.get('currency')}**${numberFormatter('#,##0.', item.price)}** \`${msg.guild.settings.get('prefix')}buy ${Object.keys(items)[i]}\``);
        }
        else {fieldValueArray.push(`» Price: ${msg.guild.settings.get('currency')}**${numberFormatter('#,##0.', item.price)}** \`${msg.guild.settings.get('prefix')}buy ${Object.keys(items)[i]}\``);}
        Embed.addField('\u200B', fieldValueArray.join('\n'), true);
      }
    }

    // send the embed
    msg.send(Embed);
  }

};