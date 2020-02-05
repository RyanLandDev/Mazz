const querystring = require('querystring');
const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'define',
	description: 'Defines a word using the Urban Dictionary.',
	aliases: ['def'],
	usage: '[word to define]',
	example: 'define mazz',
	cooldown: 5,
	async execute(message, args) {
		if (!args.length) {
			return message.channel.send('You need to supply a search term!');
		}
		const query = querystring.stringify({ term: args.join(' ') });
		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
		if (!list.length) {
			return message.channel.send(`No results found for '${args.join(' ')}'.`);
		}
		const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
		const [answer] = list;

		const embed = new Discord.RichEmbed()
			.setColor('#99c5dd')
			.setAuthor(`Definition of '${answer.word}'`, message.author.avatarURL)
			.setDescription(`${trim(answer.definition, 1024)}\n\n\`${trim(answer.example, 1024)}\``);
		message.channel.send(embed);
	},
};