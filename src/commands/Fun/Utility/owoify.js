const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Owoify your message.',
      aliases: ['owo'],
      cooldown: 3,
      usage: '[Message:str] [...]',
    });
  }

  async run(msg, params) {
    if (params.length === 0) return msg.send('No input!');
    const text = await fetch(`https://nekos.life/api/v2/owoify?text=${params.join()}`)
      .then(response => response.json())
      .then(body => body.owo);
    msg.send(':blush: | ' + text);
  }

};