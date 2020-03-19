const { Monitor } = require('klasa');
const moment = require('moment');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      ignoreOthers: false,
    });
  }

  async run(message) {
    // cooldown
    if (moment().format('x') - message.author.settings.lastXP < 45000) return;

    // generate xp
    const xpGot = Math.round(Math.random() * (25 - 15)) + 15;
    message.author.settings.update('lastXP', moment().format('x'));
    message.author.settings.update('levelXP', message.author.settings.levelXP + xpGot);

    // level up
    if (message.author.settings.levelXP + xpGot > 5 * (message.author.settings.level ^ 2) + 50 * message.author.settings.level + 100) {
      message.author.settings.update('level', message.author.settings.level + 1);
      message.author.settings.update('levelXP', 0);
      message.author.settings.update('balance', message.author.settings.balance + ((message.author.settings.level + 1) * 500));
      if (message.guild.settings.levelMsg) message.send(`Good job ${message.member}, you have reached **Level ${message.author.settings.level + 1}** and earned ${message.guild.settings.currency}**${(message.author.settings.level + 1) * 500}**!`);
    }
  }
};