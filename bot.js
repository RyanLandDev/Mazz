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

const trials_obj = require('./config/trials.json');
const trials_string = JSON.stringify(trials_obj);

const mods_obj = require('./config/mods.json');
const mods_string = JSON.stringify(mods_obj);

const admins_obj = require('./config/admins.json');
const admins_string = JSON.stringify(admins_obj);

const devs_obj = require('./config/developers.json');
const devs_string = JSON.stringify(devs_obj);

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
// mazz trial
  .add(26, ({ author }) => trials_string.includes(parseInt(author.id, 10)))
// mazz mod
  .add(27, ({ author }) => mods_string.includes(parseInt(author.id, 10)))
// mazz admin
  .add(28, ({ author }) => admins_string.includes(parseInt(author.id, 10)))
// bot developer
  .add(29, ({ author }) => devs_string.includes(parseInt(author.id, 10)))
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
