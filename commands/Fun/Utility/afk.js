const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Mark yourself as AFK.',
      cooldown: 3,
      usage: '[status:str] [...]',
      usageDelim: ' ',
      runIn: ['text'],
    });
  }

  async run(msg, params) {
    const status = params.join(' ');
    if (msg.client.settings.afk.includes(msg.author.id)) {this.client.settings.update('afk', msg.author.id, { action: 'remove' }), msg.send(`Welcome back ${msg.member}, I have removed your AFK`);}
    else {
      if (status.length > 100) throw msg.send('That status is too long!');
      msg.author.settings.update('afkStatus', status ? status : 'none');
      msg.client.settings.update('afk', msg.author.id, { action: 'add' });
      msg.send(`You are now AFK${status ? ': ' + status : ''}`);
    }
  }
};