const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Set the level of a user. Use the flag \'-add\' if you want to add on to the level instead.',
      guarded: true,
      usage: '<member:user> <level:num> [-add:literal]',
      usageDelim: ' ',
      // mazz admin
      permissionLevel: 28,
    });
  }

  async run(msg, params) {
    params[0].settings.update('level', params[2] ? params[0].settings.get('level') + params[1] : params[1]);
    msg.send(`The level of \`${params[0].username} (${params[0].id})\` has been set to Level **${params[2] ? params[0].settings.get('level') + params[1] : params[1]}**.`);
  }

};