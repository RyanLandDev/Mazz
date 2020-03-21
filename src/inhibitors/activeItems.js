const { Inhibitor } = require('klasa');
const moment = require('moment');
const items = require('../config/items/inv_items.json');

module.exports = class extends Inhibitor {
  constructor(...args) {
    super(...args, {
    });
  }

  async run(message) {
    const { settings } = this.client.users.cache.get(message.author.id);
    await settings.sync();

    const activeItems = message.author.settings.activeItems;
    if (activeItems.length <= 0) return;
    for (let i = 0; i < activeItems.length; i++) {
      let item;
      for (let i2 = 1; i2 < items.length; i2++) if (items[i2].codename === activeItems[i]) item = items[i2];
      const nowUnix = parseInt(moment().format('x'));
      const initUnix = parseInt(message.author.settings.get(item.statistics.key));
      if ((nowUnix - initUnix) > item.temporaryTime) message.author.settings.update('activeItems', item.codename, { action: 'remove' });
    }
  }
};