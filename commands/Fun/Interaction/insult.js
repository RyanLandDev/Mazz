const { Command } = require('klasa');
const roll = type => type[Math.floor(Math.random() * type.length)];

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Insults who you mention.',
      usage: '<user:mention>',
      cooldown: 3,
    });
  }

  run(msg, [user]) {
    return msg.sendMessage(`${user}, you know what? You're nothing but ${roll(start)} ${roll(middle)} ${roll(end)}.`);
  }

};

const start = require('../../../config/insult_responses.json').start;

const middle = require('../../../config/insult_responses.json').middle;

const end = require('../../../config/insult_responses.json').end;