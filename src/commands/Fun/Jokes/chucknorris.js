const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['cn'],
      description: 'Chuck Norris has some good jokes.',
      cooldown: 3,
    });
  }

  async run(msg) {
    const joke = await fetch('http://api.chucknorris.io/jokes/random')
      .then(response => response.json())
      .then(body => body.value);
    return msg.sendMessage(joke);
  }

};