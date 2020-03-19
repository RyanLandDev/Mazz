const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Display information about the (mentioned) server.',
      guarded: true,
      runIn: ['text'],
      usage: '[server:guild]',
      aliases: ['server-info', 'guildinfo', 'guild-info'],
      cooldown: 5,
    });
  }

  async run(message, [server]) {
    let Guild;
    if (!server) Guild = message.guild; else Guild = server;

    let region = Guild.region;
    if (region === 'europe') region = ':flag_eu: **Europe**';
    if (region === 'brazil') region = ':flag_br: **Brazil**';
    if (region === 'hongkong') region = ':flag_hk: **Hong Kong**';
    if (region === 'india') region = ':flag_in: **India**';
    if (region === 'japan') region = ':flag_jp: **Japan**';
    if (region === 'russia') region = ':flag_ru: **Russia**';
    if (region === 'singapore') region = ':flag_sg: **Singapore**';
    if (region === 'southafrica') region = ':flag_za: **South Africa**';
    if (region === 'sydney') region = ':flag_au: **Sydney**';
    if (region === 'us-central') region = ':flag_us: **US Central**';
    if (region === 'us-east') region = ':flag_us: **US East**';
    if (region === 'us-south') region = ':flag_us: **US South**';
    if (region === 'us-west') region = ':flag_us: **US West**';

    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setTitle('Server Info')
      .setTimestamp()
      .setThumbnail(Guild.iconURL())
      .setImage(Guild.splash)
      //
      .addField('Name', Guild.name, true)
      .addField('ID', Guild.id, true)
      .addField('Owner', Guild.owner.user, true)
      //
      .addField('Created', moment(Guild.createdAt).format('dddd Do [of] MMMM YYYY [at] h:mm:ss a') + ' (' + moment(Guild.createdAt).startOf('day').fromNow() + ')', true)
      .addField('Member Count', `${Guild.memberCount} (${Guild.members.cache.filter(m => m.user.bot == false).size} humans/${Guild.members.cache.filter(m => m.user.bot == true).size} bots)`, true)
      .addField('Region', region, true)
      //
      .addField('Categories', Guild.channels.cache.filter(m => m.type == 'category').size, true)
      .addField('Text Channels', Guild.channels.cache.filter(m => m.type == 'text' || 'news' || 'store').size, true)
      .addField('Voice Channels', Guild.channels.cache.filter(m => m.type == 'voice').size, true)
      //
      .addField('Roles', Guild.roles.cache.size, true)
      .addField('Highest Role', Guild.roles.cache.highest, true)
      .addField('Emojis', Guild.emojis.cache.size, true);
    message.channel.send(Embed);
  }

};