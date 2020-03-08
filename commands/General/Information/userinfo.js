const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Display information about the (mentioned) user.',
      guarded: true,
      runIn: ['text'],
      usage: '[member:member]',
      aliases: ['user-info', 'memberinfo', 'member-info'],
      cooldown: 5,
    });
  }

  async run(message, [member]) {
    // define what member/user to retrieve info from
    let Member;
    let User;
    if (!member) {
      User = message.author;
      Member = message.member;
    }
    else {
      Member = member;
      User = member.user;
    }

    // status
    let status = User.presence.status;
    if (status === 'offline') status = '<:ds_offline:680430294934880449> **Offline**';
    if (status === 'idle') status = '<:ds_idle:680430295006445641> **Idle**';
    if (status === 'dnd') status = '<:ds_dnd:680430295056384000> **Do not Disturb**';
    if (status === 'online') status = '<:ds_online:680430295023091807> **Online**';

    // join position
    let timestamps = Member.guild.members.cache.filter(m => m.user.bot == false).sorted((a, b) => a.joinedTimestamp - b.joinedTimestamp);
    timestamps = timestamps.array();
    let joinPos;
    for (let i = 0; i < timestamps.length; i++) {
      if (timestamps[i].user.id === User.id) joinPos = i;
    }

    // roles
    const array = [];
    for (let i = 0; i < Member.roles.cache.size; i++) {
      array.push(Member.roles.cache.array()[i].id);
    }

    // booster
    let booster;
    if (Member.premiumSince) booster = 'Yes, since ' + moment(Member.premiumSince).format('dddd Do [of] MMMM YYYY [at] h:mm:ss a') + ' (' + moment(Member.premiumSince).startOf('day').fromNow() + ')'; else booster = 'No';

    // permissions
    let permissions = Member.permissions.toArray().sort().join(', ');
    permissions = permissions.replace(/CONNECT/gi, 'Connect');
    permissions = permissions.replace(/ADMINISTRATOR/gi, '**Administrator**');
    permissions = permissions.replace(/CREATE_INSTANT_INVITE/gi, 'Invite');
    permissions = permissions.replace(/KICK_MEMBERS/gi, '**Kick**');
    permissions = permissions.replace(/BAN_MEMBERS/gi, '**Ban**');
    permissions = permissions.replace(/MANAGE_CHANNELS/gi, '**Manage Channels**');
    permissions = permissions.replace(/MANAGE_GUILD/gi, '**Manage Server**');
    permissions = permissions.replace(/ADD_REACTIONS/gi, 'React');
    permissions = permissions.replace(/VIEW_AUDIT_LOG/gi, '**View Audit Log**');
    permissions = permissions.replace(/PRIORITY_SPEAKER/gi, '**Priority Speaker**');
    permissions = permissions.replace(/STREAM/gi, 'Stream');
    permissions = permissions.replace(/VIEW_CHANNEL/gi, 'View Channels');
    permissions = permissions.replace(/SEND_MESSAGES/gi, 'Send Messages');
    permissions = permissions.replace(/SEND_TTS_MESSAGES/gi, 'Send TTS Messages');
    permissions = permissions.replace(/MANAGE_MESSAGES/gi, '**Manage Messages**');
    permissions = permissions.replace(/EMBED_LINKS/gi, 'Embed Links');
    permissions = permissions.replace(/ATTACH_FILES/gi, 'Attach Files');
    permissions = permissions.replace(/READ_MESSAGE_HISTORY/gi, 'Read History');
    permissions = permissions.replace(/MENTION_EVERYONE/gi, '**Mention Everyone**');
    permissions = permissions.replace(/USE_EXTERNAL_EMOJIS/gi, 'External Emojis');
    permissions = permissions.replace(/SPEAK/gi, 'Speak');
    permissions = permissions.replace(/MUTE_MEMBERS/gi, '**Voice Mute**');
    permissions = permissions.replace(/DEAFEN_MEMBERS/gi, '**Deafen**');
    permissions = permissions.replace(/MOVE_MEMBERS/gi, '**Move**');
    permissions = permissions.replace(/USE_VAD/gi, 'Use Voice Detection');
    permissions = permissions.replace(/CHANGE_NICKNAME/gi, 'Change Nickname');
    permissions = permissions.replace(/MANAGE_NICKNAMES/gi, '**Manage Nicknames**');
    permissions = permissions.replace(/MANAGE_ROLES/gi, '**Manage Roles**');
    permissions = permissions.replace(/MANAGE_WEBHOOKS/gi, '**Manage Webhooks**');
    permissions = permissions.replace(/MANAGE_EMOJIS/gi, '**Manage Emojis**');

    // create embed
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setThumbnail(User.avatarURL({ dynamic: true }))
      .setTitle('User Info')
      .setTimestamp()
      .addField('Username', User.tag, true)
      .addField('User ID', User.id, true)
      .addField('Status', status, true)
      .addField('Created', moment(User.createdAt).format('dddd Do [of] MMMM YYYY [at] h:mm:ss a') + ' (' + moment(User.createdAt).startOf('day').fromNow() + ')', true)
      .addField('Joined', moment(Member.joinedAt).format('dddd Do [of] MMMM YYYY [at] h:mm:ss a') + ' (' + moment(Member.joinedAt).startOf('day').fromNow() + ')', true)
      .addField('Join Position', joinPos + 1, true)
      .addField('Roles', '<@&' + array.join('> <@&') + '> (' + Member.roles.cache.size + ')', true)
      .addField('Permissions', permissions, true)
      .addField('Administrator', Member.permissions.toArray().includes('ADMINISTRATOR') ? 'Yes' : 'No', true)
      .addField('Booster', booster, true);

    // send embed
    message.channel.send(Embed);
  }

};