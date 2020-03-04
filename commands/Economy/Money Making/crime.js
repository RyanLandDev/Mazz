const { Command } = require('klasa');
const responses = require('../../../config/work_responses.json').main;
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Commit a crime. Bad.',
      cooldown: 900,
    });
  }

  async run(message) {
    const response = responses[Math.round(Math.random() * responses.length)];

    const reward = Math.round(Math.random() * (400 - 18) + 18);
    message.author.settings.update('balance', message.author.settings.get('balance') + reward);

    let transformedResponse = response.replace('{currency}', message.guild.settings.get('currency'));
    transformedResponse = transformedResponse.replace('{reward}', reward);

    const Embed = new MessageEmbed()
      .setColor('GREEN')
      .setDescription(transformedResponse)
      .setAuthor(message.author.username, message.author.avatarURL());
    message.send(Embed);
  }

};