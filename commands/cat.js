const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'cat',
	description: 'Generates a random cat picture.',
	async execute(message) {
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
		const Embed = new Discord.RichEmbed()
			.setImage(file)
			.setColor('GREEN')
			.setTitle('Cat 🐱');
		message.channel.send(Embed);
	},
};