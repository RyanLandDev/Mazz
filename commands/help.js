// require modules
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const { configprefix } = require('../config.json');

// Prefixes - set connection information
const prefixdb = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'prefixes.sqlite',
});

// Prefixes - define the model
const Prefixes = prefixdb.define('prefixes', {
	prefix: Sequelize.STRING,
	guild: Sequelize.INTEGER,
});

module.exports = {
	name: 'help',
	description: 'Lists all commands or information about a specific command.',
	aliases: ['commands', 'commandlist'],
	usage: '[command]',
	allowDm: true,
	example: 'help ping',
	async execute(message, args) {
		const { commands } = message.client;

		if (message.channel.type !== 'dm') {
		//
		// !! IN-SERVER !!
		//
		// prefix loader
			await Prefixes.findOrCreate({ where: { guild: message.guild.id }, defaults: { prefix: configprefix, guild: message.guild.id } });
			const getprefix = await Prefixes.findOne({ where: { guild: message.guild.id } });
			const prefix = getprefix.prefix;

			if (!args.length) {
				const Embed = new Discord.RichEmbed()
					.setColor('#99c5dd')
					.setAuthor(message.author.username, message.author.avatarURL)
					.setDescription(`\`${commands.map(command => `${prefix}${command.name}`).join('` `')}\`\n\nYou can use \`${prefix}help [command]\` to get more information about a specific command.`);
				// eslint-disable-next-line no-unused-vars
				return message.author.send(Embed).then(() => message.react('📨')).catch(error => {
					const Embed2 = new Discord.RichEmbed()
						.setColor('#d61d1d')
						.setAuthor(message.author.username, message.author.avatarURL)
						.setDescription('<:ds_redtick:591919718554796033> Message failed. Please ensure [Direct Messages](https://support.discordapp.com/hc/en-us/articles/204849987-What-are-Direct-Messages-PM-DM-) are [enabled](https://support.discordapp.com/hc/en-us/articles/217916488-Blocking-Privacy-Settings-)!');
					message.channel.send(Embed2);
				});
			}

			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				const Embed = new Discord.RichEmbed()
					.setColor('#d61d1d')
					.setAuthor(message.author.username, message.author.avatarURL)
					.setDescription(`<:ds_redtick:591919718554796033> No command found! Usage: \`${prefix}${command.name} ${command.usage}\``);
				message.channel.send(Embed);
			}
			else {
				const Embed = new Discord.RichEmbed()
					.setColor('#99c5dd')
					.setTitle(command.name)
					.setAuthor(message.author.username, message.author.avatarURL)
					.setDescription(`${command.description}\nCooldown: ${command.cooldown || 3} seconds`);
				if (command.usage) {
					Embed.addField('**Usage**', `\`\`\`fix\n${prefix}${command.name} ${command.usage}\`\`\``);
					Embed.setFooter('<> = required parameter, [] = optional parameter');
				}
				if (command.example) {
					Embed.addField('**Example**', `\`\`\`fix\n${prefix}${command.example}\`\`\``);
				}
				if (command.aliases) {
					Embed.addField('**Aliases**', `\`${command.aliases.join('` `')}\``);
				}
				// eslint-disable-next-line no-unused-vars
				message.author.send(Embed).then(() => message.react('📨')).catch(error => {
					const Embed2 = new Discord.RichEmbed()
						.setColor('#d61d1d')
						.setAuthor(message.author.username, message.author.avatarURL)
						.setDescription('<:ds_redtick:591919718554796033> Message failed. Please ensure [Direct Messages](https://support.discordapp.com/hc/en-us/articles/204849987-What-are-Direct-Messages-PM-DM-) are [enabled](https://support.discordapp.com/hc/en-us/articles/217916488-Blocking-Privacy-Settings-)!');
					message.channel.send(Embed2);
				});
			}
		}
		else {
			//
			// !! IN-DM !!
			//
			if (!args.length) {
				const Embed = new Discord.RichEmbed()
					.setColor('#99c5dd')
					.setAuthor(message.author.username, message.author.avatarURL)
					.setDescription(`\`${commands.map(command => `${command.name}`).join('` `')}\`\n\nYou can use \`help [command]\` to get more information about a specific command.`);
				return message.channel.send(Embed);
			}
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				const Embed = new Discord.RichEmbed()
					.setColor('#d61d1d')
					.setAuthor(message.author.username, message.author.avatarURL)
					.setDescription('<:ds_redtick:591919718554796033> No command found! Usage: `help [command]`');
				return message.channel.send(Embed);
			}
			else {
				const Embed = new Discord.RichEmbed()
					.setColor('#99c5dd')
					.setTitle(command.name)
					.setAuthor(message.author.username, message.author.avatarURL)
					.setDescription(`${command.description}\nCooldown: ${command.cooldown || 3} seconds`);
				if (command.usage) {
					Embed.addField('**Usage**', `\`\`\`fix\n${command.name} ${command.usage}\`\`\``);
					Embed.setFooter('<> = required parameter, [] = optional parameter');
				}
				if (command.example) {
					Embed.addField('**Example**', `\`\`\`fix\n${command.example}\`\`\``);
				}
				if (command.aliases) {
					Embed.addField('**Aliases**', `\`${command.aliases.join('` `')}\``);
				}
			}
		}
	},
};