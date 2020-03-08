const { Command } = require('klasa');

const items = require('../../../config/store/store_items.json');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Buy an item from the store.',
      hidden: true,
      usage: '[item:str]',
    });
  }

  async run(msg, [item]) {
    const buyingItem = items[item];

    if (!Object.keys(items).includes(item)) return msg.send('No (valid) item specified');
    if (buyingItem.price > msg.author.settings.get('balance')) return msg.send('Insufficient funds');

    console.log(buyingItem);
  }

};