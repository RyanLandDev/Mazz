const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Call one of your contacts.',
      usage: '<recipient:str>',
      runIn: ['text'],
    });
  }

  async run(msg) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    msg.send('Test');
  }
};