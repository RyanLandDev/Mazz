const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Talk with me.',
      aliases: ['c'],
      cooldown: 1,
      usage: '[message:str] [...]',
    });
  }

  async run(msg, params) {
    if (params.length === 0) throw msg.send('hi');
    msg.channel.startTyping();
    const text = await fetch(`https://some-random-api.ml/chatbot?message=${params.join()}`)
      .then(response => response.json())
      .then(body => body.response);
    msg.send(text);
    msg.channel.stopTyping();
  }

};