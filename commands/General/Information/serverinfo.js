const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Display information about the (mentioned) server.',
      guarded: true,
      runIn: ['text'],
      usage: '[Server:guild]',
      aliases: ['server-info', 'guildinfo', 'guild-info'],
      cooldown: 5,
    });
  }

  async run(message, [Server]) {
    let Guild;
    if (!Server) Guild = message.guild; else Guild = Server;
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setTitle('Server Info')
      .setTimestamp()
      .setThumbnail(Guild.iconURL())
      .addField('Name', Guild.name, true)
      .addField('ID', Guild.id, true)
      .addField('Owner', `${Guild.owner.user.tag}`, true)
      .addField('Member Count', `${Guild.memberCount}`, true)
      .addField('Created', moment(Guild.createdAt).format('dddd Do [of] MMMM YYYY [at] h:mm:ss a') + ' (' + moment(Guild.createdAt).startOf('day').fromNow() + ')', true);
    message.channel.send(Embed);
  }

};