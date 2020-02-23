const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Epic test',
      aliases: ['test-10'],
    });
  }

  async run(message) {
    message.channel.send('my emote')
      .then((msg)=> {
        setTimeout(function() {
          msg.edit('my others emotes');
        }, 1000);
      });
  }
};