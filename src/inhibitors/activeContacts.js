const { Inhibitor } = require('klasa');
const contacts = require('../config/contacts/contacts.json');

module.exports = class extends Inhibitor {
  constructor(...args) {
    super(...args, {
    });
  }

  async run(message) {
    const activeContacts = message.author.settings.get('activeContacts');
    if (activeContacts.length <= 0) return;
    for (const activeContact of activeContacts) {
      // Retrieve the contact
      const contact = contacts.find(c => c.codename === activeContact);
      if (!contact) continue;
      if (!contact.temporary) continue;

      // Do operations
      const nowUnix = Date.now();
      const initUnix = parseInt(message.author.settings.get(contact.timeKey));
      if ((nowUnix - initUnix) > contact.temporaryTime) await message.author.settings.update('activeContacts', contact.codename, { arrayAction: 'remove' });
    }
  }
};