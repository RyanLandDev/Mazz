const { Command } = require('klasa');
const items = require('../../config/store/store_items.json');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: '',
      aliases: ['shop'],
      cooldown: 5,
      runIn: ['text'],
    });
  }

  async run(msg) {
    const Embed = new MessageEmbed()
      .setTitle('Store')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTimestamp()
      .setColor('#0099FF')
      .setDescription(`You currently have ${msg.guild.settings.get('currency')}**${msg.author.settings.get('balance')}**.`);

    for (let i = 1; i < Object.keys(items).length; i++) {
      const item = items[Object.keys(items)[i]];
      Embed.addField('\u200B', [`**${item.title}**`,
        item.summary,
        `» ${item.statistics.friendlyname}: ${msg.author.settings.get(item.statistics.key) ? msg.author.settings.get(item.statistics.key) : '0'} > ${msg.author.settings.get(item.statistics.key) + item.statistics.increaser ? msg.author.settings.get(item.statistics.key) + item.statistics.increaser : item.statistics.increaser}`,
        `» Price: ${msg.guild.settings.get('currency')}**${item.price}** \`${msg.guild.settings.get('prefix')}buy ${Object.keys(items)[i]}\``].join('\n'), true);
    }
    msg.send(Embed);
  }

};