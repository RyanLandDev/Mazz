// require modules
const Discord = require('discord.js');
const { Client, PermissionLevels } = require('klasa');

const tokens = require('./config/tokens.json');
const client = new Discord.Client();
const token = tokens.login_token;

// ============================================================================================================================================
//
// Permission Levels
//
// ============================================================================================================================================

Client.permissionLevels = new PermissionLevels(31)
// anyone
  .add(0, () => true)
// anyone that isn't banned from using the bot
// (add)
// kick members
  .add(21, ({ guild, member }) => guild && member.permissions.has('KICK_MEMBERS'))
// ban members
  .add(22, ({ guild, member }) => guild && member.permissions.has('BAN_MEMBERS'))
// manage server
  .add(23, ({ guild, member }) => guild && member.permissions.has('MANAGE_GUILD'))
// server administrator
  .add(24, ({ guild, member }) => guild && member.permissions.has('ADMINISTRATOR'))
// server owner
  .add(25, ({ guild, member }) => guild && member === guild.owner)
// bot developers
  .add(29, 1 === 1)
// RyanLand
  .add(30, ({ author }) => author.id === 298491523459317762);

// ============================================================================================================================================
//
// Client
//
// ============================================================================================================================================

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
