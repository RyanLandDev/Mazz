const Discord = require('discord.js');
const { prefix } = require('../config.json');
const { Prefixes } = require('../dbObjects');

module.exports = {
	name: 'prefix',
	description: 'Allows you to set a custom bot prefix for the server.',
	example: 'prefix m!',
	cooldown: 5,
	usage: '<new prefix>',
	async execute(message, args) {
		if (!message.member.hasPermission('ADMINISTRATOR', false, false)) {
			const Embed = new Discord.RichEmbed()
				.setColor('#d61d1d')
				.setAuthor(message.author.username, message.author.avatarURL)
				.setDescription('<:ds_redtick:591919718554796033> You need the **Administrator** permission to execute this command!');
			return message.channel.send(Embed);
		}
		if (!args[0]) {
			const Embed = new Discord.RichEmbed()
				.setColor('#d61d1d')
				.setAuthor(message.author.username, message.author.avatarURL)
				.setDescription(`<:ds_redtick:591919718554796033> You need to provide arguments! Usage: \`${prefix}prefix <new prefix>\``);
			return message.channel.send(Embed);
		}
		const newPrefix = args.join('');
		if (newPrefix.length > 4) return message.channel.send('Prefixes can\'t be longer than 4 characters!');
		try {
			const affectedRows = await Prefixes.update({ prefix: newPrefix }, { where: { guild: message.guild.id } });
			if (affectedRows < 0) return console.error('something went wrong with setting a prefix.');
			return message.channel.send(`Prefix set to \`${newPrefix}\`!`);
		}
		catch (e) {
			console.error(e);
			return message.channel.send('Something went wrong with setting the prefix.');
		}
	},
};