const { Client, PermissionLevels } = require('klasa');

const tokens = require('./config/tokens.json');
const clientConfig = require('./config/clientConfig.json');

// ============================================================================================================================================
//
// Permission Levels
//
// ============================================================================================================================================

clientConfig.permissionLevels = new PermissionLevels(31)
// anyone that isn't banned from using the bot
  .add(0, ({ member }) => JSON.stringify(require('./config/userbans.json')).includes(!member.id))
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
  .add(26, ({ member }) => JSON.stringify(require('./config/trials.json')).includes(member.id))
// mazz moderator
  .add(27, ({ member }) => JSON.stringify(require('./config/moderators.json')).includes(member.id))
// mazz admin
  .add(28, ({ member }) => JSON.stringify(require('./config/admins.json')).includes(member.id))
// bot developer
  .add(29, ({ member }) => JSON.stringify(require('./config/developers.json')).includes(member.id))
// RyanLand
  .add(30, ({ author, client }) => author.id === client.application.owner.ownerID);

// ============================================================================================================================================
//
// Client
//
// ============================================================================================================================================

// create KlasaClient
new Client(clientConfig).login(tokens.login_token);