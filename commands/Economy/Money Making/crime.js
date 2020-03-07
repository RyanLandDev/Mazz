const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Commit a crime. Bad.',
      cooldown: 900,
      runIn: ['text'],
    });
  }

  async run(message) {
    const chance = Math.round(Math.random() * 100);
    let responses;
    let reward;
    if (chance < 60) responses = require('../../../config/responses/crime_responses.json').fail, reward = Math.round(Math.random() * (-18 - -2000) + -2000); else responses = require('../../../config/responses/crime_responses.json').success, reward = Math.round(Math.random() * (3500 - 18) + 18);
    const response = responses[Math.round(Math.random() * responses.length)];

    message.author.settings.update('balance', message.author.settings.get('balance') + reward);
    let displayReward;
    if (reward <= 0) displayReward = reward * -1; else displayReward = reward;

    let transformedResponse = response.replace('{currency}', message.guild.settings.get('currency'));
    transformedResponse = transformedResponse.replace('{reward}', '**' + displayReward + '**');

    const Embed = new MessageEmbed()
      .setDescription(transformedResponse)
      .setAuthor(message.author.username, message.author.avatarURL());
    if (reward >= 0) Embed.setColor('GREEN'); else Embed.setColor('RED');
    message.send(Embed);
  }

};