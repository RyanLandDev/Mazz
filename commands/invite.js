const discord = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'Allows you to invite Mazz to your own server.',
	aliases: ['guide'],
	execute(message) {
		const embed = new discord.RichEmbed()
			.setColor('#99c5dd')
			.setAuthor(message.author.username, message.author.avatarURL)
			.setDescription('◉ [Add Mazz to your server](https://bit.ly/addmazz)\n◉ [Support Server](https://discord.gg/aZEZ7Ct');
		message.channel.send(embed);
	},
};