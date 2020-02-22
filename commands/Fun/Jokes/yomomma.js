const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Your mom is so fat..',
      cooldown: 3,
      aliases: ['yourmom', 'ym'],
    });
  }

  async run(message) {
    const joke = await fetch('http://api.yomomma.info')
      .then(response => response.json())
      .then(body => body.joke);
    return message.sendMessage(joke);
  }

};