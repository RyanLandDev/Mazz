const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, { description: 'Returns a fact. About something.', cooldown: 3 });
  }

  async run(msg) {
    const quote = await fetch('https://nekos.life/api/v2/fact')
      .then(response => response.json())
      .then(body => body.fact)
      .catch(() => { throw 'There was an error. Please try again.'; });
    return msg.sendMessage(':page_facing_up: | ' + quote);
  }

};