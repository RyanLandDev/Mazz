const { Command } = require('klasa');
const figletAsync = require('util').promisify(require('figlet'));

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Makes ASCII text.',
      usage: '<banner:str>',
      cooldown: 10,
    });
  }

  async run(msg, [banner]) {
    return msg.sendCode('', await figletAsync(banner));
  }

};