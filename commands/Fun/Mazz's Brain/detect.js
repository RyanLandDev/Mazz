const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Detect if you are speaking facts or fables.',
      usage: '<lie:str>',
      usageDelim: ' ',
      cooldown: 3,
    });
  }

  async run(msg) {
    msg.send(`:alien: | I have analyzed your sentence and have come to the conclusion that it is a ${Math.round(Math.random()) === 0 ? '**Lie**' : '**Fact**'}`);
  }
};