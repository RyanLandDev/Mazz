const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'dog',
	description: 'Generates a random dog picture.',
	async execute(messag) {
		const { message } = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json());
		const Embed = new Discord.RichEmbed()
			.setImage(message)
			.setColor('GREEN')
			.setTitle('Dog 🐕');
		messag.channel.send(Embed);
	},
};