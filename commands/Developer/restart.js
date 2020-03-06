const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      // developer
      permissionLevel: 29,
      guarded: true,
      aliases: ['rs'],
      description: 'Restarts the bot.',
    });
  }

  async run(message) {
    await message.channel.send('Restarting...').catch(err => this.client.emit('error', err));
    await Promise.all(this.client.providers.map(provider => provider.shutdown()));
    process.exit();
  }

  async init() {
    this.client.user.setPresence({ 'activity': { 'name': `m!help | ${this.client.guilds.size} servers 🔥` }, 'status': 'online' });
  }
};
