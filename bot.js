// require modules
const Discord = require('discord.js');
const { Client } = require('klasa');
const { token } = require('./config.json');

const client = new Discord.Client();

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
