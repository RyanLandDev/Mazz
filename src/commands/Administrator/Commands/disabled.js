const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'This command will give a list of all commands currently disabled in this server.',
      guarded: true,
      // server admin
      permissionLevel: 24,
    });
  }

  async run(msg) {
    const disabled = msg.guild.settings.get('disabledCommands');
    if (disabled.length === 0) throw msg.send('There are currently no commands disabled on this server.');

    msg.send(
      new MessageEmbed()
        .setAuthor(msg.guild.name, msg.guild.iconURL())
        .setColor('#0099FF')
        .setThumbnail(msg.guild.iconURL())
        .setDescription(`Disabled commands:\n\`${disabled.join('` `')}\``),
    );
  }
};