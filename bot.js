// require modules
const Discord = require('discord.js');
const fs = require('fs');

// create a new client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// ============================================================================================================================================
//
// Status
//
// ============================================================================================================================================

client.once('ready', () => {
	// log that the bot is ready
	console.log('Ready!');
	// bot activity
	client.user.setActivity(`m!help | ${client.guilds.size} servers 🔥`);
});

client.on('guildCreate', () => {
	client.user.setActivity(`m!help | ${client.guilds.size} servers 🔥`);
});

client.on('guildDelete', () => {
	client.user.setActivity(`m!help | ${client.guilds.size} servers 🔥`);
});

// ============================================================================================================================================
//
// Login
//
// ============================================================================================================================================

client.login(process.env.token)

// ============================================================================================================================================
//
// Initialization
//
// ============================================================================================================================================

const express = require("express");
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
