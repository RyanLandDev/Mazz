// require modules
const Sequelize = require('sequelize');
const Discord = require('discord.js');
const { prefix } = require('../config.json');

// set connection information
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'tags.sqlite',
});

// define the model
const Tags = sequelize.define('tags', {
	name: Sequelize.STRING,
	description: Sequelize.TEXT,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
		allowNull: false,
	},
	guild: Sequelize.INTEGER,
}, { timestamps: false });

module.exports = {
	name: 'tag',
	description: 'View, list, create, edit, and remove server tags.\n\n**Formatting Tips**\n- All Discord markdown is supported.\n- Embed a link using `[text](link)`\n- __Underline__ or **boldify** important parts of your tag',
	usage: '<tag name (view)/list/create/edit/remove> [<tag name>] [<tag description (create)> <new tag description (edit)>] \n\nSub-command aliases: add, delete',
	example: `tag Awesome\n${prefix}tag list\n${prefix}tag create Awesome Mazz is awesome!\n${prefix}tag edit Awesome Mazz is fantastic!\n${prefix}tag remove Awesome`,
	async execute(message, args) {
		if (!args[0]) {
			const Embed = new Discord.RichEmbed()
				.setColor('#d61d1d')
				.setAuthor(message.author.username, message.author.avatarURL)
				.setDescription(`<:ds_redtick:591919718554796033> You need to provide arguments! Usage: \`${prefix}tag <tag name (view)/list/create/edit/remove> [<tag name>] [<tag description (create)> <new tag description (edit)>]\``);
			return message.channel.send(Embed);
		}
		//
		//
		// CREATE TAG
		//
		//
		if (args[0] === 'create' || args[0] === 'add') {
			if (!message.member.hasPermission('MANAGE_GUILD', false, false)) {
				const Embed = new Discord.RichEmbed()
					.setColor('#d61d1d')
					.setAuthor(message.author.username, message.author.avatarURL)
					.setDescription('<:ds_redtick:591919718554796033> You need the **Manage Server** permission to execute this command!');
				return message.channel.send(Embed);
			}
			if (!args[2]) {
				const Embed = new Discord.RichEmbed()
					.setColor('#d61d1d')
					.setAuthor(message.author.username, message.author.avatarURL)
					.setDescription(`<:ds_redtick:591919718554796033> You need to provide arguments! Usage: \`${prefix}tag create/add <tag name> <tag description>\``);
				return message.channel.send(Embed);
			}
			const tagName = args[1];
			const slice = args.slice(2);
			const tagDescription = slice.join(' ');
			if (tagName.length > 16) return message.channel.send('Tag names can\'t be longer than 16 characters!');
			if (tagDescription.length > 255) return message.channel.send('Tag descriptions can\'t be longer than 255 characters!');
			if (tagName === 'add' || tagName === 'create' || tagName === 'remove' || tagName === 'delete' || tagName === 'edit' || tagName === 'list') return message.channel.send('A tag name can\'t be the same as a sub-command!');
			const existsTag = await Tags.findOne({ where: { name: tagName, guild: message.guild.id } });
			if (existsTag) return message.channel.send('A tag with this name already exists!');
			try {
				// equivalent to: INSERT INTO tags (name, descrption, username) values (?, ?, ?);
				const tag = await Tags.create({
					name: tagName,
					description: tagDescription,
					guild: message.guild.id,
				});
				return message.channel.send(`Tag \`${tag.name}\` created!`);
			}
			catch (e) {
				if (e.name === 'SequelizeUniqueConstraintError') return message.channel.send('Unique error. Please report this in the Support Server.');
				return message.channel.send('Something went wrong with adding a tag.');
			}
		}
		//
		//
		// LIST TAGS
		//
		//
		else if (args[0] === 'list') {
			// equivalent to: SELECT name FROM tags;
			const tagList = await Tags.findAll({ attributes: ['name'], where: { guild: message.guild.id } });
			const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
			return message.channel.send(`List of tags: ${tagString}`);
		}
		//
		//
		// DELETE TAG
		//
		//
		else if (args[0] === 'remove' || args[0] === 'delete') {
			if (!message.member.hasPermission('MANAGE_GUILD', false, false)) {
				const Embed = new Discord.RichEmbed()
					.setColor('#d61d1d')
					.setAuthor(message.author.username, message.author.avatarURL)
					.setDescription('<:ds_redtick:591919718554796033> You need the **Manage Server** permission to execute this command!');
				return message.channel.send(Embed);
			}
			// equivalent to: DELETE from tags WHERE name = ?;
			const tagName = args[1];
			const rowCount = await Tags.destroy({ where: { name: tagName, guild: message.guild.id } });
			if (!rowCount) return message.channel.send('That tag doesn\'t exist.');

			return message.channel.send('Tag deleted!');
		}
		//
		//
		// EDIT TAG
		//
		//
		else if (args[0] === 'edit') {
			if (!message.member.hasPermission('MANAGE_GUILD', false, false)) {
				const Embed = new Discord.RichEmbed()
					.setColor('#d61d1d')
					.setAuthor(message.author.username, message.author.avatarURL)
					.setDescription('<:ds_redtick:591919718554796033> You need the **Manage Server** permission to execute this command!');
				return message.channel.send(Embed);
			}
			if (!args[2]) {
				const Embed = new Discord.RichEmbed()
					.setColor('#d61d1d')
					.setAuthor(message.author.username, message.author.avatarURL)
					.setDescription(`<:ds_redtick:591919718554796033> You need to provide arguments! Usage: \`${prefix}tag edit <tag name> <new tag description>\``);
				return message.channel.send(Embed);
			}
			const tagName = args[1];
			const slice = args.slice(2);
			const tagDescription = slice.join(' ');
			if (tagDescription.length > 255) return message.channel.send('Tag descriptions can\'t be longer than 255 characters!');
			// equivalent to: UPDATE tags (description) values (?) WHERE name = ?;
			const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName, guild: message.guild.id } });
			if (affectedRows > 0) return message.channel.send(`Tag ${tagName} edited!`);
			return message.channel.send(`Could not find a tag with name \`${tagName}\`.`);
		}
		//
		//
		// VIEW TAG
		//
		//
		const tagName = args[0];
		// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
		const tag = await Tags.findOne({ where: { name: tagName, guild: message.guild.id } });
		if (tag) {
			// equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
			tag.increment('usage_count');
			const Embed = new Discord.RichEmbed()
				.setColor('#99c5dd')
				.setAuthor(message.author.username, message.author.avatarURL)
				.setTitle(tagName)
				.setDescription(tag.description)
				.setFooter(`👀 Views: ${tag.usage_count}`);
			return message.channel.send(Embed);
			// `${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`
		}
		return message.channel.send('Tag not found.');
	},
};