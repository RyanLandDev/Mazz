const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Set the balance of a user. Use the flag \'-add\' if you want to add on to the balance instead.',
      aliases: ['setmoney', 'setcash', 'setwallet'],
      guarded: true,
      usage: '<member:user> <amount:num> [-add:literal]',
      usageDelim: ' ',
      // mazz admin
      permissionLevel: 28,
    });
  }

  async run(msg, params) {
    params[0].settings.update('balance', params[2] ? params[0].settings.get('balance') + params[1] : params[1]);
    msg.send(`The balance of \`${params[0].username} (${params[0].id})\` has been set to ${msg.guild.settings.get('currency')}**${params[2] ? params[0].settings.get('balance') + params[1] : params[1]}**.`);
  }

};