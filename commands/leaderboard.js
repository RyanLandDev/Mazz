const Discord = require('discord.js');
const currency = new Discord.Collection();
const client = new Discord.Client();

module.exports = {
	name: 'leaderboard',
	description: 'View the currency leaderboard.',
	aliases: ['lb'],
	execute(message) {
		return message.channel.send(
			currency.sort((a, b) => b.balance - a.balance)
				.filter(user => client.users.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(client.users.get(user.user_id).tag)}: ${user.balance}💰`)
				.join('\n'),
			{ code: true },
		);
	} };