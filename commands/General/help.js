const { Command } = require('klasa');
const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['commands'],
      guarded: true,
      permissionLevel: 7,
      description: 'You can use this command to get a list of all commands or information about one.',
      usage: '(Command:command)',
    });

    this.createCustomResolver('command', (arg, possible, message) => {
      if (!arg || arg === '') return undefined;
      return this.client.arguments.get('command').run(arg, possible, message);
    });
  }

  async run(message, [command]) {
    console.log('0');
    if (command) {
      const info = [
        `= ${command.name} = `,
        command.description,
        `Usage :: ${command.usage.fullUsage(message)}`,
      ].join('\n');
      console.log('1');
      return message.channel.send(info, { code: 'asciidoc' });
    }
    const help = await this.buildHelp(message);
    const categories = Object.keys(help);
    const helpMessage = [];
    for (let cat = 0; cat < categories.length; cat++) {
      helpMessage.push(`**${categories[cat]} Commaaands**:`, '```asciidoc');
      const subCategories = Object.keys(help[categories[cat]]);
      for (let subCat = 0; subCat < subCategories.length; subCat++) helpMessage.push(`= ${subCategories[subCat]} =`, `${help[categories[cat]][subCategories[subCat]].join('\n')}\n`);
      helpMessage.push('```', '\u200b');
      console.log('2');
    }

    return message.author.send(helpMessage, { split: { char: '\u200b' } })
      .then(() => { if (message.channel.type !== 'dm') message.channel.send('📥 | The list of commands you have access to has been sent to your DMs.'); })
      .catch(() => { if (message.channel.type !== 'dm') message.channel.send('❌ | You have DMs disabled, I couldn\'t send you the commands in DMs.'); });
  }

  async buildHelp(message) {
    const help = {};

    const { prefix } = message.guildSettings;
    const commandNames = [...this.client.commands.keys()];
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    console.log('3');
    await Promise.all(this.client.commands.map((command) =>
      this.client.inhibitors.run(message, command, true)
        .then(() => {
          if (!has(help, command.category)) help[command.category] = {};
          if (!has(help[command.category], command.subCategory)) help[command.category][command.subCategory] = [];
          const description = command.description;
          help[command.category][command.subCategory].push(`${prefix}${command.name.padEnd(longest)} :: ${description}`);
          console.log('4');
        })
        .catch(() => {
          // noop
        }),
    ));

    return help;
  }

};