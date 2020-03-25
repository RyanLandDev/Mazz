const { Inhibitor } = require('klasa');
const items = require('../config/items/inv_items.json');

module.exports = class extends Inhibitor {
  constructor(...args) {
    super(...args, {
    });
  }

  async run(message) {
    const activeItems = message.author.settings.get('activeItems').slice();
    if (activeItems.length <= 0) return;
    for (let i = 0; i < activeItems.length; i++) {
      let item;
      for (let i2 = 1; i2 < items.length; i2++) if (items[i2].codename === activeItems[i]) item = items[i2];
      const nowUnix = Date.now();
      const initUnix = parseInt(message.author.settings.get(item.statistics.key));
      if ((nowUnix - initUnix) > item.temporaryTime) message.author.settings.update('activeItems', item.codename, { arrayAction: 'remove' });
    }
  }
};