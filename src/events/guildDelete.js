const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

  constructor(...args) {
    super(...args, {
    });
  }

  run(guild) {
    this.client.user.setPresence({ 'activity': { 'name': `m!help | ${this.client.guilds.size} servers 🔥` } });
    this.client.channels.get('662412990074716170').send(new MessageEmbed()
      .setTitle('Server Leave')
      .setColor('#0099FF')
      .setThumbnail(guild.iconURL())
      .setDescription(`${guild.name} (${guild.id})`));
  }
};