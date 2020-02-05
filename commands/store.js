const { CurrencyShop } = require('../dbObjects');

module.exports = {
	name: 'store',
	description: 'View the store.',
	aliases: ['shop', 'usershop', 'userstore'],
	async execute(message) {
		const items = await CurrencyShop.findAll();
		return message.channel.send(items.map(item => `${item.name}: ${item.cost}💰`).join('\n'), { code: true });
	},
};