const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['commands'],
      guarded: true,
      description: 'You can use this command to get a list of all commands or information about one.',
      usage: '(command:command)',
      cooldown: 3,
      runIn: ['text'],
    });

    this.createCustomResolver('command', (arg, possible, message) => {
      if (!arg || arg === '') return undefined;
      return this.client.arguments.get('command').run(arg, possible, message);
    });
  }

  async run(message, [command]) {
    // ============================================================================================================================================
    //
    // Command Help
    //
    // ============================================================================================================================================

    if (command) {
      const info = [
        `= ${command.name} = `,
        command.description,
        `Usage :: ${command.usage}`,
      ].join('\n');
      return message.send(info, { code: 'asciidoc' });
    }

    // ============================================================================================================================================
    //
    // Commands List
    //
    // ============================================================================================================================================

    const richDisplay = new RichDisplay(new MessageEmbed()
      .setColor('#0099FF')
      .setAuthor(this.client.user.username, this.client.user.avatarURL())
      .setDescription(`Here is a list of all commands.\nUse \`${message.guild.settings.get('prefix')}help [command]\` for more information about a command!`),
    );

    const commands = this.client.commands;
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    const help = await Promise.all(commands.map((command) =>
      this.client.inhibitors.run(message, command, true)
        .then(() => {
          const description = command.description;

          richDisplay.addPage(template => template.setDescription('Page 1'));
        }),
    ));

    richDisplay.addPage(template => template.setDescription('Page 1'));
    richDisplay.addPage(template => template.setDescription('Page 2 test'));

    return richDisplay.run(await message.send('Loading help...'));

    // async buildHelp(message) {
    //   const help = {};
    //   const { prefix } = message.guildSettings;
    //   const commandNames = [...this.client.commands.keys()];
    //   const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    //   await Promise.all(this.client.commands.map((command) =>
    //     this.client.inhibitors.run(message, command, true)
    //       .then(() => {
    //         if (!has(help, command.category)) help[command.category] = {};
    //         if (!has(help[command.category], command.subCategory)) help[command.category][command.subCategory] = [];
    //         const description = command.description;
    //         help[command.category][command.subCategory].push(`${prefix}${command.name.padEnd(longest)} :: ${description}`);
    //       }),
    //   ));
    //   return help;
  }
};