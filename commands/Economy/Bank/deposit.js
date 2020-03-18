const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Deposit money to your bank account.',
      aliases: ['dep', 'dp'],
      usage: '<amount:num|all>',
      runIn: ['text'],
    });
  }

  async run(msg, params) {
    let amount;
    if (params[0] === 'all') amount = msg.author.settings.get('balance'); else amount = params[0];
    const bankStorageLeft = msg.author.settings.get('bankStorage') - msg.author.settings.get('bankBalance');
    if (amount > bankStorageLeft) amount = bankStorageLeft;
    if (amount > msg.author.settings.get('balance') || msg.author.settings.balance <= 0) throw msg.send('Insufficient funds');
    if (amount <= 0) throw msg.send('Not enough bank storage! Try upgrading your bank account');

    msg.author.settings.update('balance', msg.author.settings.get('balance') - amount);
    this.client.settings.update('bankMoney', this.client.settings.get('bankMoney') + amount);
    msg.author.settings.update('bankBalance', msg.author.settings.get('bankBalance') + amount);

    msg.send(`<:greentick:635082052261380097> **Coins deposited to bank account!**\n\n:moneybag: **Bank Account:** ${msg.guild.settings.get('currency')}**${msg.author.settings.get('bankBalance')}** > ${msg.guild.settings.get('currency')}**${msg.author.settings.get('bankBalance') + amount}**`);
  }
};