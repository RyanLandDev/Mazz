const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Check the leaderboards.',
      usage: '[wallet|bank] [-g]',
      runIn: ['text'],
      aliases: ['lb', 'lead'],
    });
  }

  async run(msg, params) {
    let type;
    if (params[0]) type = params[0]; else type = 'money';
    let global;
    if (params[1]) global = true; else global = false;
  }
};