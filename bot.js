// require modules
const Discord = require('discord.js');
const { Client, PermissionLevels } = require('klasa');
require('dotenv').config();

const config = require('./config.json');
const client = new Discord.Client();
const token = process.env.token;

config.permissionLevels = new PermissionLevels()
  // anyone can use
  .addLevel(0, false, () => true);

// create a new client
new Client({
  fetchAllMembers: false,
  prefix: 'm!',
  presence: { name: `m!help | ${client.guilds.size} servers 🔥` },
  commandEditing: true,
  typing: true,
  noPrefixDM: true,
  prefixCaseInsensitive: true,
  readyMessage: () => 'Ready!',
}).login(token);

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
