const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check on the bank.',
    });
  }

  async run(msg) {
    const Embed = new MessageEmbed()
      .setAuthor('Grand Bank of Mazz', this.client.user.avatarURL())
      .setTitle('Bank')
      .setColor('#0099FF')
      .addField(':credit_card: In Account', msg.guild.settings.get('currency') + '**' + msg.author.settings.get('bankBalance') + '**', true)
      .addField(':moneybag: Grand Bank of Mazz', msg.guild.settings.get('currency') + '**' + this.client.settings.get('bankMoney') + '**', true);
    msg.send(Embed);
  }
};