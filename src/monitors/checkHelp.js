const { Monitor } = require('klasa');

module.exports = class extends Monitor {

  constructor(...args) {
    super(...args, {
      ignoreOthers: false,
    });
  }

  run(message) {
    if (message.content === 'm!help' && message.guild.settings.get('prefix') !== 'm!') return message.send('The prefix in this guild is different. Please use **' + message.guild.settings.get('prefix') + 'help**!');
  }

};