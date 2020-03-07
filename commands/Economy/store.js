const { Command } = require('klasa');
const items = require('../../config/store_items.json');
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
      msg.send('Iteration');
      console.log(items[1]);
     // Embed.addField('\0', `**${item.title}**\n${item.summary}\n» ${item.statistics.friendlyname}: ${msg.author.settings.get(item.statistics.key)} > ${msg.author.settings.get(item.statistics.key + item.statistics.increaser)}\n» Price: ${msg.guild.settings.get('currency')}**${item.price}** \`${msg.guild.settings.get('prefix')}buy ${item}\``);
    }
    msg.send(Embed);
  }

};