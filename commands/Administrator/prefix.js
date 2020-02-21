const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Set a new prefix for the server.',
      guarded: true,
      usage: '[NewPrefix:str{1,4}]',
      runIn: ['text'],
      // Server Admin
      permissionLevel: 24,
    });
  }

  async run(message, [...params]) {
    if (!params[0]) return message.channel.send(`The prefix for \`${message.guild.name}\` is **${message.guild.settings.get('prefix')}**`);
    if (params[0] === message.guild.settings.get('prefix')) return message.channel.send(`The prefix for \`${message.guild.name}\` is already **${params[0]}**!`);
    message.guild.settings.update('prefix', params[0], message.guild, { avoidUnconfigurable: true, action: 'overwrite' });
    return message.channel.send(`The prefix has been set to **${params[0]}**!`);
  }

};