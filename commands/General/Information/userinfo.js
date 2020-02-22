const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Display information about the (mentioned) user.',
      guarded: true,
      runIn: ['text'],
      usage: '[User:member]',
      aliases: ['user-info', 'memberinfo', 'member-info'],
      cooldown: 5,
    });
  }

  async run(message, [User]) {
    let Member;
    if (!User) {
      User = message.author;
      Member = message.member;
    }
    else {
      Member = User;
      User = User.user;
    }
    let status = User.presence.status;
    if (status === 'offline') status = '<:ds_offline:680430294934880449> **Offline**';
    if (status === 'idle') status = '<:ds_idle:680430295006445641> **Idle**';
    if (status === 'dnd') status = '<:ds_dnd:680430295056384000> **Do not Disturb**';
    if (status === 'online') status = '<:ds_online:680430295023091807> **Online**';
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setThumbnail(User.avatarURL())
      .setTitle('User Info')
      .setTimestamp()
      .addField('Username', User.tag, true)
      .addField('User ID', User.id, true)
      .addField('Status', status, true)
      .addField('Created', moment(User.createdAt).format('dddd Do [of] MMMM YYYY [at] h:mm:ss a') + ' (' + moment(User.createdAt).startOf('day').fromNow() + ')', true)
      .addField('Joined', moment(Member.joinedAt).format('dddd Do [of] MMMM YYYY [at] h:mm:ss a') + ' (' + moment(Member.joinedAt).startOf('day').fromNow() + ')', true);
    message.channel.send(Embed);
  }

};