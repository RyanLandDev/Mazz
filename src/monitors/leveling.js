const { Monitor, Timestamp } = require('klasa');
const moment = require('moment');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      ignoreOthers: false,
    });
    this.timestamp = new Timestamp('x');
  }

  async run(message) {
    // cooldown
    if (this.timestamp.display() - message.author.settings.get('lastXP') < 45000) return;

    // generate xp
    const xpGot = Math.round(Math.random() * (25 - 15)) + 15;
    message.author.settings.update('lastXP', moment().format('x'));
    message.author.settings.update('levelXP', message.author.settings.get('levelXP') + xpGot);

    // level up
    if (message.author.settings.get('levelXP') + xpGot > 5 * (message.author.settings.get('level') ^ 2) + 50 * message.author.settings.get('level') + 100) {
      message.author.settings.update('level', message.author.settings.get('level') + 1);
      await message.author.settings.update('levelXP', 1);
      message.author.settings.update('balance', message.author.settings.get('balance') + ((message.author.settings.get('level') + 1) * 500));
      if (message.guild.settings.get('levelMsg')) message.send(`Good job ${message.member}, you have reached **Level ${message.author.settings.get('level') + 1}** and earned ${message.guild.settings.get('currency')}**${(message.author.settings.get('level') + 1) * 500}**!`);
    }
  }
};