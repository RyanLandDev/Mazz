module.exports = {
	name: 'ping',
	description: 'Checks the bot\'s ping.',
	execute(message) {
		message.channel.send(`:ping_pong: Pong! Returned at ${Math.round(message.client.ping)}ms.`);
	},
};