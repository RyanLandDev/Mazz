const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Display information about the mentioned role (ID/Name).',
      guarded: true,
      usage: '<Role:role|RoleName:str>',
      aliases: ['role-info', 'role'],
      cooldown: 5,
      runIn: ['text'],
    });
  }

  async run(message, [Role]) {
    let newRole;
    // triggers if the role is incorrect, so we can search for name
    // search role via name, access parameter using params[0] then set Role to role object
    if (typeof Role === 'string') {
      // Roles Object for server. / this is the way of saying search for the role with role name Role
      newRole = await message.guild.roles.find(roleFind => roleFind.name == Role);
      // checks if it found the role
      if (!newRole) return message.channel.send('No role found with that name! (Case-sensitive)');
    }
    else { newRole = Role; }

    const hex = newRole.hexColor.split('#')[1];
    let hexText = hex;
    if (hex === '000000') hexText = '000000 or Transparent';
    const Embed = new MessageEmbed()
      .setColor('#0099FF')
      .setThumbnail(`http://singlecolorimage.com/get/${hex}/100x100`)
      .setTitle('Role Info')
      .setTimestamp()
      .addField('Name', `<@&${newRole.id}>`, true)
      .addField('ID', newRole.id, true)
      .addField('Color', hexText + ' - Preview »', true)
      .addField('Hoisted', newRole.hoist ? 'Yes' : 'No', true)
      .addField('Mentionable', newRole.mentionable ? 'Yes' : 'No', true)
      .addField('Created', moment(newRole.createdAt).format('dddd Do [of] MMMM YYYY [at] h:mm:ss a') + ' (' + moment(newRole.createdAt).startOf('day').fromNow() + ')', true)
      .addField('Member Count', newRole.members.size, true)
      .addField('Administrator', newRole.permissions.toArray().includes('ADMINISTRATOR') ? 'Yes' : 'No', true)
      .addField('Position', message.guild.roles.size - newRole.position + ' from top', true);
    message.channel.send(Embed);
  }

};