// require modules
const Discord = require('discord.js');
const { Client, PermissionLevels } = require('klasa');
require('./.env');

const config = require('./config.json');
const client = new Discord.Client();
const token = process.env.token;

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
// Permission Levels
//
// ============================================================================================================================================

config.permissionLevels = new PermissionLevels(31)
// anyone
  .add(0, () => true)
// anyone that isn't banned from using the bot
// (add)
// kick members
  .add(20, ({ guild, member }) => guild && member.permissions.has('KICK_MEMBERS'), { fetch: true })
// ban members
  .add(21, ({ guild, member }) => guild && member.permissions.has('BAN_MEMBERS'), { fetch: true })
// manage server
  .add(22, ({ guild, member }) => guild && member.permissions.has('MANAGE_GUILD'), { fetch: true })
// server administrator
  .add(23, ({ guild, member }) => guild && member.permissions.has('ADMINISTRATOR'), { fetch: true })
// server owner
  .add(24, ({ guild, member }) => guild && member === guild.owner, { fetch: true })

// (add 25-29)

// RyanLand (silent)
  .add(30, ({ author }) => author === client.owner, { break: true });

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
