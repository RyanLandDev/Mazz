const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {

  constructor(...args) {
    super(...args, {
    });
  }

  run(guild) {
    this.client.user.setPresence({ 'activity': { 'name': `m!help | ${this.client.guilds.size} servers 🔥` } });
    guild.owner.send(new MessageEmbed()
      .setTitle('<:ds_greentick:591919521598799872> Thanks for adding me to your server!')
      .setColor('#2f3136')
      .setDescription('Hello! <:pepeeyes:635082052076568606>\n\nMy name is **Mazz**!\n\nYou probably don\'t care about this message, so I\'m just gonna say a few things:\n• Mazz is epic <:coolboi:640340288774340610>\n• Use `m!help` for a list of all commands <:sip:640340294575063074>\n• If you need any help or just want to chill, check out the official [Mazz Server](https://discord.gg/aZEZ7Ct) <:blobgift:640326927571484692>\n\nThanks for inviting Mazz! I hope you enjoy our bot <a:disco:640340298999922698>')
      .setFooter(this.client.user.username, this.client.user.avatarURL())
      .setTimestamp());
    this.client.channels.get('662335785034448897').send(new MessageEmbed()
      .setTitle('Server Join')
      .setColor('#0099FF')
      .setThumbnail(guild.iconURL())
      .setDescription(`${guild.name} (${guild.id})`),
    );
  }
};