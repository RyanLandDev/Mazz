// ============================================================================================================================================
//
// Command Template
//
// ============================================================================================================================================

// Welcome to the Mazz command template!
// This is the template for coding a command for the bot. Please use this template when creating a new command.

// ============================================================================================================================================

// require klasa framework
const { Command } = require('klasa');

// set up the command
module.exports = class extends Command {

  // construct the command and configure it
  constructor(...args) {
    super(...args, {
      // Name: the name of the option
      // Default: the value used if the option is not set
      // Type: the value type
      // Description: a description explaining what the option is and does
      // ==========================================================================================
      // Name: aliases
      // Default: []
      // Type: Array<string>
      // Description: Controls the command's aliases
      aliases: [],
      // Name: autoAliases
      // Default: true
      // Type: boolean
      // Description: If automatic aliases should be added (adds aliases of name and aliases without dashes)
      autoAliases: true,
      // Name: requiredPermissions
      // Default: 0
      // Type: PermissionResolvable
      // Description: The required Discord permissions for the bot to use this command
      requiredPermissions: 0,
      // Name: bucket
      // Default: 1
      // Type: number
      // Description: The number of times this command can be run before ratelimited by the cooldown
      bucket: 1,
      // Name: cooldown
      // Default: 0
      // Type: number
      // Description: The amount of time before the user can run the command again in seconds
      cooldown: 0,
      // Name: cooldownLevel
      // Default: 'author'
      // Type: string
      // Description: The level the cooldown applies to (valid options are 'author', 'channel', 'guild')
      cooldownLevel: 'author',
      // Name: deletable
      // Default: false
      // Type: boolean
      // Description: If the responses should be deleted if the triggering message is deleted
      deletable: false,
      // Name: description
      // Default: ''
      // Type: string or function
      // Description: The help description for the command
      description: '',
      // Name: enabled
      // Default: true
      // Type: boolean
      // Description: Controls if whether the command is enabled or not
      enabled: false,
      // Name: guarded
      // Default: false
      // Type: boolean
      // Description: If the command can be disabled on a guild level (does not effect global disable)
      guarded: true,
      // Name: hidden
      // Default: false
      // Type: boolean
      // Description: If the command should be hidden
      hidden: false,
      // Name: name
      // Default: Name of file
      // Type: string
      // Description: The name of the command.
      name: 'command name',
      // Name: nsfw
      // Default: false
      // Type: boolean
      // Description: If the command should only run in nsfw channels
      nsfw: false,
      // Name: permissionLevel
      // Default: 0
      // Type: number
      // Description: The required permission level to use the command
      permissionLevel: 0,
      // Name: promptLimit
      // Default: 0
      // Type: number
      // Description: The number or attempts allowed for re-prompting an argument
      promptLimit: 0,
      // Name: promptTime
      // Default: 30000
      // Type: number
      // Description: The time allowed for re-prompting of this command
      promptTime: 30000,
      // Name: quotedStringSupport
      // Default: false
      // Type: boolean
      // Description: Whether args for this command should not deliminated inside quotes
      quotedStringSupport: false,
      // Name: requiredSettings
      // Default: []
      // Type: Array<string>
      // Description: The required guild settings to use this command
      requiredSettings: [],
      // Name: runIn
      // Default: ['text','dm']
      // Type: Array<string>
      // Description: What channel types the command should run in
      runIn: ['text', 'dm'],
      // Name: subcommands
      // Default: false
      // Type: boolean
      // Description: Whether to enable sub commands or not
      subcommands: false,
      // Name: usage
      // Default: ''
      // Type: string
      // Description: The usage string for the command
      usage: '',
      // Name: usageDelim
      // Default: undefined
      // Type: string
      // Description: The string to delimit the command input for usage
      usageDelim: undefined,
      // ==========================================================================================
      // reference: https://klasa.js.org/#/docs/klasa/master/typedef/CommandOptions
    });
  }

  // message variable = message object of the message which was used to trigger the command
  // params variable = all parameters given in an array depending on usage string
  async run(message, [...params]) {
    // code run when the command is called
  }

  async init() {
    /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
  }

};