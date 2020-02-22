const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['catfact', 'kittenfact'],
      description: 'Let me tell you a mysterious cat fact.',
      cooldown: 3,
    });
  }

  async run(msg) {
    const fact = await fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(body => body.fact);
    return msg.sendMessage(fact);
  }

};