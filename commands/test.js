const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      guarded: true,
      description: 'Get the ping of the bot.',
      permissionLevel: 30,
    });
  }

  async run(message) {
    const devs_obj = require('../config/developers.json');
    const devs_string = JSON.stringify(devs_obj);
    if (devs_string.includes(parseInt(message.author.id, 10))) return message.channel.send('True boi'); else message.channel.send('False boi');
  }

};