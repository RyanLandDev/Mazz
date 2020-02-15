const { Command } = require('klasa');

// set up the command
module.exports = class extends Command {

  // construct the command and configure it
  constructor(...args) {
    super(...args, {
      aliases: [],
      autoAliases: true,
      requiredPermissions: 0,
      deletable: false,
      description: 'Add a new developer.',
      enabled: true,
      guarded: false,
      hidden: false,
      name: 'is this the actual command you write? for example m!this',
      permissionLevel: 25,
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
  // params variable = all parameters given in an array
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