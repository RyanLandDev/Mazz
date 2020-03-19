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
    this.client.user.setPresence({ 'activity': { 'name': '🔁 RESTARTING...' } });
    await Promise.all(this.client.providers.map(provider => provider.shutdown()));
    process.exit();
  }

  async init() {
    this.client.user.setPresence({ 'activity': { 'name': '✅ RESTART DONE!' } });

    const parent = this;
    setTimeout(function() {
      parent.client.user.setPresence({ 'activity': { 'name': `m!help | ${parent.client.guilds.cache.size} servers 🔥` } });
    }, 5000);
  }
};
