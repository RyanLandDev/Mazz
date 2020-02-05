module.exports = {
	name: 'docs',
	description: 'Gives a link to the official Mazz documentation.',
	aliases: ['guide'],
	execute(message) {
		message.channel.send(`:ping_pong: Pong! Returned at ${Math.round(message.client.ping)}ms.`);
	},
};