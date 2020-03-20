const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['commands'],
      guarded: true,
      description: 'You can use this command to get a list of all commands or information about one.',
      usage: '[command:command]',
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
      // form the usage
      let usage = command.usage.fullUsage(message);
      usage = usage.replace(message.guild.settings.prefix + ' ', '');
      if (!usage.startsWith('《')) usage = usage.replace(/([^\s]+)/, '');
      usage = usage.replace(/(.*(?<=》))|(:[^\]>]*)/g, '');

      // form the cooldown
      let cooldown = command.cooldown;
      if (cooldown >= 60) cooldown = `${Math.round(cooldown / 60)} minutes${cooldown - (Math.round(cooldown / 60) * 60) === 0 ? '' : ` and ${(cooldown - (Math.round(cooldown / 60) * 60))} seconds`}`; else cooldown = cooldown + ' seconds';

      // form the embed
      const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setTitle(command.name)
        .setColor('#0099FF')
        .setDescription(command.cooldown === 0 ? command.description : `${command.description}\nCooldown: ${cooldown}`)
        .addField('**Usage**', `\`\`\`fix\n${message.guild.settings.prefix}${command.name}${usage}\n\`\`\``)
        .setFooter('<> = required parameter, [] = optional parameter');
      if (command.aliases.length >= 1) embed.addField('**Aliases**', '`' + command.aliases.join('` `') + '`');
      return message.send(embed);
    }

    // ============================================================================================================================================
    //
    // Commands List
    //
    // ============================================================================================================================================

    const richDisplay = new RichDisplay(new MessageEmbed()
      .setColor('#0099FF')
      .setAuthor(message.author.username, message.author.avatarURL())
      .setTitle('Help'),
    );

    const mainCategories = getDirectories('./src/commands');
    mainCategories.splice(mainCategories.length - 2, 2);
    const commands = this.client.commands;

    const cmds = {};
    for (let i = 0; i < mainCategories.length; i++) {
      cmds[mainCategories[i]] = {};
      const subCategories = getDirectories(`./src/commands/${mainCategories[i]}`);
      for (let i2 = 0; i2 < subCategories.length; i2++) cmds[mainCategories[i]][subCategories[i2]] = [];
    }

    for (let i = 0; i < mainCategories.length; i++) {
      for (let i2 = 0; i2 < commands.size; i2++) {
        const commandName = Array.from(commands.keys())[i2];
        const cmd = commands.get(commandName);
        const checkPermissions = await message.hasAtLeastPermissionLevel(cmd.permissionLevel);
        const subCategories = getDirectories(`./src/commands/${mainCategories[i]}`);
        for (let i3 = 0; i3 < subCategories.length; i3++) if (cmd.category === mainCategories[i] && cmd.subCategory === subCategories[i3] && checkPermissions) cmds[mainCategories[i]][subCategories[i3]].push(commandName);
      }
      // form description
      const description = [`Below is a list of all commands within this category. You can use the reaction buttons to switch between categories.\nUse \`${message.guild.settings.get('prefix')}help [command]\` for more information about a command!`];
      for (let i4 = 0; i4 < getDirectories(`./src/commands/${mainCategories[i]}`).length; i4++) {
        const subCategories = getDirectories(`./src/commands/${mainCategories[i]}`);
        description.push('');
        description.push(`**${subCategories[i4]}**`);
        if (cmds[mainCategories[i]][subCategories[i4]].length === 0) description.push('(You don\'t have access to any of the commands in this subcategory.)'); else description.push('`' + cmds[mainCategories[i]][subCategories[i4]].join('` `') + '`');
      }
      let categoryCommands = 0;
      for (let i2 = 0; i2 < Object.keys(cmds[mainCategories[i]]).length; i2++) {
        for (let i3 = 0; i3 < cmds[mainCategories[i]][Object.keys(cmds[mainCategories[i]])[i2]].length; i3++) {
          const commandName = cmds[mainCategories[i]][Object.keys(cmds[mainCategories[i]])[i2]][i3];
          const cmd = commands.get(commandName);
          const checkPermissions = await message.hasAtLeastPermissionLevel(cmd.permissionLevel);
          if (checkPermissions) categoryCommands = categoryCommands + 1;
        }
      }
      if (categoryCommands !== 0) {
        richDisplay.addPage(template => {
          template.setDescription(description.join('\n'));
          template.setTitle(`Help - ${mainCategories[i]}`);
          return template;
        });
      }
    }

    richDisplay.setFooterPrefix('Help - Page ');
    return richDisplay.run(await message.send('Loading help...'));
  }
};