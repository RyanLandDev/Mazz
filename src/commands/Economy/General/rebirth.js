const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

// todo: make multiplier work

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Rebirth.',
      runIn: ['text'],
      aliases: ['rb', 'reb'],
      cooldown: 10,
    });
  }

  async run(msg) {
    const { settings } = msg.author;
    await settings.sync();

    const rebirth = msg.author.settings.rebirth ? msg.author.settings.rebirth : 0;
    const price = 100000 + rebirth * 10000;

    if (msg.author.settings.balance < price) throw msg.send('You don\'t have enough money to rebirth!' + ` Need ${msg.guild.settings.currency}**${price - msg.author.settings.balance}** more`);

    const newRebirth = msg.author.settings.rebirth + 1;

    msg.author.settings.update('bankBalance', 0);
    msg.author.settings.update('balance', 0);
    msg.author.settings.update('robChance', 50);
    msg.author.settings.update('robCut', 20);
    msg.author.settings.update('robExtraChance', 0);
    msg.author.settings.update('bankStorage', 0);
    msg.author.settings.update('rebirth', msg.author.settings.rebirth + 1);
    msg.author.settings.update('items', [], { action: 'overwrite' });
    msg.author.settings.update('activeItems', [], { action: 'overwrite' });
    await settings.sync();

    const embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setColor('GREEN')
      .setDescription(`You are now rebirth **${newRebirth}**!\n+ 0.1 Money Multiplier`);
    msg.send(embed);
  }
};