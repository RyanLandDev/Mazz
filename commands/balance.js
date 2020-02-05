const Discord = require('discord.js');
const currency = new Discord.Collection();

// helper methods
Reflect.defineProperty(currency, 'getBalance', {
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

module.exports = {
	name: 'balance',
	description: 'Gets your money balance.',
	aliases: ['bal', 'money', 'wallet'],
	execute(message) {
		const target = message.mentions.users.first() || message.author;
		return message.channel.send(`\`${target.tag}\` has ${currency.getBalance(target.id)}💰`);
	},
};