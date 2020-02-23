const { Command } = require('klasa');

// unfinished being worked on by intervexian

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'I know how long your penis is.',
      aliases: ['dick', 'pp'],
    });
  }

  async run(message) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    console.log(getRandomInt(3));
    console.log(getRandomInt(1));
    console.log(Math.random());
  }

};