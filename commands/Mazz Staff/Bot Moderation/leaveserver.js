const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Let Mazz leave the mentioned server.',
      guarded: true,
      // Mazz Developer
      permissionLevel: 29,
      usage: '<Server:guild>',
    });
  }

  async run(message, [...params]) {
    params[0].leave()
      .then(g => message.channel.send(`I have left \`${g}\` (${g.id}).`))
      .catch(console.error);
  }

};