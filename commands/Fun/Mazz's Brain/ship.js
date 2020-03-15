const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'I know how connected everything is to eachother.',
      usageDelim: ' ',
      usage: '<ThingOne:str> <ThingTwo:str>',
    });
  }

  async run(msg, params) {
    if (params[0] === params[1]) throw msg.send(':sparkling_heart: | Those are the same two things idiot');
    msg.send(`:sparkling_heart: | \`${params[0]}\` and \`${params[1]}\` are ${Math.round(Math.random() * 100)}% connected`);
  }
};