const { Event } = require('klasa');

module.exports = class extends Event {

  constructor(...args) {
    super(...args, {
    });
  }

  run() {
    this.client.user.setPresence({ 'activity': { 'name': `m!help | ${this.client.guilds.cache.size} servers 🔥` } });
  }
};