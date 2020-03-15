// ============================================================================================================================================
//
// Use Canary or Main
const useCanary = true;
//
// ============================================================================================================================================

const { Client, PermissionLevels } = require('klasa');

require('dotenv').config();
const clientConfig = require('./config/clientConfig.json');

// ============================================================================================================================================
//
// Permission Levels
//
// ============================================================================================================================================

clientConfig.permissionLevels = new PermissionLevels(31)
// anyone that isn't banned from using the bot
  .add(0, ({ member }) => JSON.stringify(require('./config/users/userbans.json')).includes(!member.id))
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
  .add(26, ({ member }) => JSON.stringify(require('./config/users/trials.json')).includes(member.id))
// mazz moderator
  .add(27, ({ member }) => JSON.stringify(require('./config/users/moderators.json')).includes(member.id))
// mazz admin
  .add(28, ({ member }) => JSON.stringify(require('./config/users/admins.json')).includes(member.id))
// bot developer
  .add(29, ({ member }) => JSON.stringify(require('./config/users/developers.json')).includes(member.id))
// RyanLand
  .add(30, ({ author, client }) => author.id === client.application.owner.ownerID);

// ============================================================================================================================================
//
// Client
//
// ============================================================================================================================================

// create KlasaClient
new Client(clientConfig).login(useCanary === true ? process.env.CANARY_TOKEN : process.env.DISCORD_TOKEN);

// ============================================================================================================================================
//
// Databases
//
// ============================================================================================================================================

Client.defaultClientSchema
// Total money in bank
  .add('bankMoney', 'integer', { default: 0 });

Client.defaultGuildSchema
// Currency/Icon
  .add('currency', 'string', { default: '<:ds_coin:598799086795096084>' });

Client.defaultUserSchema
// Balance
  .add('balance', 'integer', { default: 0 })
  .add('bankBalance', 'integer', { default: 0 })

// Items
  .add('activeItems', 'string', { array: true })
  .add('items', 'string', { array: true })

// Upgrades
  .add('robChance', 'integer', { default: 50, min: 10, max: 50 })
  .add('robCut', 'integer', { default: 20, min: 20, max: 80 })
  .add('robExtraChance', 'integer', { default: 0, min: 0, max: 50 })
  .add('bankStorage', 'integer', { default: 0, min: 0, max: 50000 });