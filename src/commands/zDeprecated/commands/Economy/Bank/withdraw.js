const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Withdraw money from your bank account.',
      aliases: ['with', 'wd'],
      usage: '<amount:num|all>',
    });
  }

  async run(msg, params) {
    let amount;
    if (params[0] === 'all') amount = msg.author.settings.get('bankBalance'); else amount = params[0];
    if (amount > msg.author.settings.get('bankBalance')) amount = msg.author.settings.get('bankBalance');
    if (amount <= 0) throw msg.send('You can\'t withdraw less than zero!');
    if (this.client.settings.update('bankMoney') <= 0) throw msg.send('Not enough money in the bank');

    msg.author.settings.update('balance', msg.author.settings.get('balance') + amount);
    this.client.settings.update('bankMoney', this.client.settings.get('bankMoney') - amount);
    msg.author.settings.update('bankBalance', msg.author.settings.get('bankBalance') - amount);

    msg.send(`<:greentick:635082052261380097> **Coins withdrawn from bank account!**\n\n:moneybag: **Bank Account:** ${msg.guild.settings.get('currency')}${msg.author.settings.get('bankBalance')} > ${msg.guild.settings.get('currency')}${msg.author.settings.get('bankBalance') - amount}`);
  }
};