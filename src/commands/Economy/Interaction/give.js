const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Give another user some money.',
      runIn: ['text'],
      cooldown: 10,
      usage: '<member:member> <amount:num>',
      usageDelim: ' ',
    });
  }

  async run(msg, params) {
    const member = params[0], amount = params[1];
    if (member === msg.member) throw msg.send('You can\'t give to yourself!');
    if (amount < 1) throw msg.send('You can\'t give someone less than zero!');
    if (amount > msg.author.settings.balance) throw msg.send('You can\'t give more than you have!');

    msg.author.settings.update('balance', msg.author.settings.balance - amount);
    member.user.settings.update('balance', member.user.settings.balance + amount);

    msg.send('Transaction complete!');

    this.client.channels.cache.get('664128623896428554').send(new MessageEmbed()
      .setTitle('Give')
      .setColor('#0099FF')
      .setThumbnail(msg.guild.iconURL())
      .addField('Amount', msg.guild.settings.currency + amount, true)
      .addField('Giver', `${msg.author.tag} (${msg.author.id})`, true)
      .addField('Receiver', `${member.user.tag} (${member.user.id})`, true)
      .addField('Giver\'s Original Balance', msg.author.settings.balance, true)
      .addField('Giver\'s Final Balance', msg.author.settings.balance - amount, true)
      .addField('Guild', msg.guild.name + ` (${msg.guild.id})`, true)
      .addField('Receiver\'s Original Balance', member.user.settings.balance, true)
      .addField('Receiver\'s Final Balance', member.user.settings.balance + amount, true),
    );
  }
};