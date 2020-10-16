const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Beg for money. How deep have you sunk.',
      cooldown: 120,
      runIn: ['text'],
    });
  }

  async run(msg) {
    const reward = Math.round(Math.random() * (200 - 2) + 2);
    await msg.author.settings.update('balance', msg.author.settings.get('balance') + reward);

    const response = 'You begged and got {currency}{reward}';
    let transformedResponse = response.replace(/{currency}/gi, msg.guild.settings.get('currency'));
    transformedResponse = transformedResponse.replace(/{reward}/gi, '**' + reward + '**');

    const Embed = new MessageEmbed()
      .setColor('GREEN')
      .setDescription(transformedResponse)
      .setAuthor(msg.author.username, msg.author.avatarURL());
    msg.send(Embed);
  }
};