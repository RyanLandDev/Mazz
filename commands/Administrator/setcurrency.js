const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Set the server currency. Emojis are supported.',
      aliases: ['seticon', 'setvaluta'],
      guarded: true,
      usage: '<NewCurrency:str{1,32}>',
      runIn: ['text'],
      // Server Admin
      permissionLevel: 24,
    });
  }

  async run(message, [...params]) {
    if (!params[0]) return message.channel.send(`The currency of \`${message.guild.name}\` is **${message.guild.settings.get('currency') ? message.guild.settings.get('currency') : '<:ds_coin:598799086795096084>'}**`);
    if (params[0] === message.guild.settings.get('currency')) return message.channel.send(`The currency of \`${message.guild.name}\` is already **${params[0]}**!`);
    message.guild.settings.update('currency', params[0], message.guild, { avoidUnconfigurable: true, action: 'overwrite' });
    return message.channel.send(`The currency has been set to **${params[0]}**!`);
  }

};