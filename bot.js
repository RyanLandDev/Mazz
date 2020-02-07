// require modules
const Discord = require('discord.js');
const { Client } = require('klasa');

const client = new Discord.Client();

// create a new client
new Client({
  fetchAllMembers: false,
  prefix: 'm!',
  commandEditing: true,
  typing: true,
  noPrefixDM: true,
  prefixCaseInsensitive: true,
  readyMessage: () => 'Ready!',
}).login('NjUwMjczNDU0MDYyNTY3NDM1.Xj0dig.RmOexpnQoYUmh1mA_6JAd6gHDhA');

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
// Initialization
//
// ============================================================================================================================================

const express = require('express');
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
