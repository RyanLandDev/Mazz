const { Client, PermissionLevels } = require('klasa');
const Discord = require('discord.js');
const client = new Discord.Client();

const tokens = require('./config/tokens.json');
const clientConfig = require('./config/clientConfig.json');
console.log(clientConfig);

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

clientConfig.permissionLevels = new PermissionLevels(31)
// anyone
  .add(0, () => true)
// anyone that isn't banned from using the bot
// (add)
// ============================================================================================================================================

  .add(1, () => true)
  .add(2, () => true)
  .add(3, () => true)
  .add(4, () => true)
  .add(5, () => true)
  .add(6, () => true)
  .add(7, () => true)
  .add(8, () => true)
  .add(9, () => true)
  .add(10, () => true)
  .add(11, () => true)
  .add(12, () => true)
  .add(13, () => true)
  .add(14, () => true)
  .add(15, () => true)
  .add(16, () => true)
  .add(17, () => true)
  .add(18, () => true)
  .add(19, () => true)
  .add(20, () => true)

// ============================================================================================================================================
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
  .add(29, ({ member }) => devs_string.includes(member.id))
// RyanLand
  .add(30, ({ author }) => author.id === client.owner);

// ============================================================================================================================================
//
// Client
//
// ============================================================================================================================================

new Client(clientConfig).login(tokens.login_token);