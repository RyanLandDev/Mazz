/* eslint-disable no-unused-vars */
const { Command } = require('klasa');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: '',
      enabled: false,
      guarded: true,
      name: '',
    });
  }

  async run(message, [...params]) {
    // code
  }

  async init() {
    // code on init
  }

};
this.client.user.setPresence({ game: { name: 'm!help | ${client.guilds.size} servers 🔥' }, status: 'idle' });