const Discord = require('discord.js');
const currency = new Discord.Collection();
const { Users } = require('../dbObjects');

// helper methods
Reflect.defineProperty(currency, 'add', {
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

module.exports = {
	name: 'addc',
	description: 'Give another fsfarrency.',
	cooldown: 1,
	execute(message, args) {
		const transferAmount = args.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
		const transferTarget = message.mentions.users.first();

		if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
		if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

		currency.add(transferTarget.id, transferAmount);

		return message.channel.send(`Added ${transferAmount} to \`${transferTarget.tag}\`. They now have :money_bag:${currency.getBalance(transferTarget.id)}`);
	},
};