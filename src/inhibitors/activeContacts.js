const { Inhibitor } = require('klasa');
const moment = require('moment');
const contacts = require('../config/contacts/contacts.json');

module.exports = class extends Inhibitor {
  constructor(...args) {
    super(...args, {
    });
  }

  async run(message) {
    const { settings } = this.client.users.cache.get(message.author.id);
    await settings.sync();

    const activeContacts = message.author.settings.activeContacts;
    if (activeContacts.length <= 0) return;
    for (let i = 0; i < activeContacts.length; i++) {
      let contact;
      for (let i2 = 1; i2 < contacts.length; i2++) if (contacts[i2].codename === activeContacts[i]) contact = contacts[i2];
      if (!contact) continue;
      if (!contact.temporary) continue;
      const nowUnix = parseInt(moment().format('x'));
      const initUnix = parseInt(message.author.settings.get(contact.timeKey));
      if ((nowUnix - initUnix) > contact.temporaryTime) message.author.settings.update('activeContacts', contact.codename, { action: 'remove' });
    }
  }
};