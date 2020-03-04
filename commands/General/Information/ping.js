const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      guarded: true,
      description: 'Get the ping of the bot.',
      cooldown: 2,
    });
  }

  async run(message) {
    message.channel.send(`:ping_pong: | Returned at ${Math.round(this.client.ws.ping)}ms.`);
  }

};
