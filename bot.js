// require modules
const { configprefix, token } = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// ===============================================================================================================================================
//
// Events
//
// ===============================================================================================================================================

// ready
client.once('ready', () => {
	// log that the bot is ready
	console.log('Ready!');
	// bot activity
	client.user.setActivity(`m!help | ${client.guilds.size} servers 🔥`);
});

// guildCreate
client.on('guildCreate', () => {
	client.user.setActivity(`m!help | ${client.guilds.size} servers 🔥`);
});

// guildDelete
client.on('guildDelete', () => {
	client.user.setActivity(`m!help | ${client.guilds.size} servers 🔥`);
});

// ===============================================================================================================================================
//
// Database
//
// ===============================================================================================================================================

const { Users, Prefixes } = require('./dbObjects');
console.log(Prefixes);
const currency = new Discord.Collection();

// helper methods
Reflect.defineProperty(currency, 'add', {
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		else {
			const newUser = await Users.create(
				{ user_id: { id, unique: true }, balance: amount },
				{ timestamps: false },
			);
			currency.set(id, newUser);
			return newUser;
		}
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

// ready event
client.once('ready', async () => {
	const storedBalances = await Users.findAll();
	storedBalances.forEach((b) => currency.set(b.user_id, b));
});

// ===============================================================================================================================================
//
// Command Handler
//
// ===============================================================================================================================================

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on('message', async (message) => {
	//
	// !! IN-GUILD !!
	//
	if (message.channel.type !== 'dm') {
		// prefix loader
		await Prefixes.findOrCreate({
			where: { guild: message.guild.id },
			defaults: { prefix: configprefix, guild: message.guild.id },
		});
		const getprefix = await Prefixes.findOne({ where: { guild: message.guild.id } });
		const prefix = getprefix.prefix || '';
		if (message.content === 'prefix') {return message.channel.send(`The prefix for \`${message.guild.name}\` is ${prefix}`);}

		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command =
			client.commands.get(commandName) ||
			client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		if (!command.allowDm && message.channel.type !== 'text') {
			return message.reply('I can\'t execute that command inside DMs!');
		}

		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply);
		}

		// cooldowns
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(
					`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`,
				);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.execute(message, args);
		}
		catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	}
	else {
		//
		// !! IN-DM !!
		//
		// prefix loader
		const prefix = '';
		if (message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command =
			client.commands.get(commandName) ||
			client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		if (!command.allowDm && message.channel.type !== 'text') {
			return message.reply('I can\'t execute that command inside DMs!');
		}

		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send(reply);
		}

		// cooldowns
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(
					`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`,
				);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.execute(message, args);
		}
		catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	}
});

// ===============================================================================================================================================
//
// Events Handler
//
// ===============================================================================================================================================

// (empty)

// ===============================================================================================================================================
//
// Login
//
// ===============================================================================================================================================

client.login(token);
