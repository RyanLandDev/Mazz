const { Command } = require('klasa');
const responses = require('../../../config/work_responses.json').main;
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Do some quick work for cash.',
      cooldown: 900,
    });
  }

  async run(message) {
    const response = responses[Math.round(Math.random() * responses.length)];

    let transformedResponse = response.replace('{currency}', message.guild.settings.get('currency'));
    transformedResponse = transformedResponse.replace('{reward}', Math.round(Math.random() * (18 - 400) + 18));

    const Embed = new MessageEmbed()
      .setColor('GREEN')
      .setDescription(transformedResponse)
      .setAuthor(message.author.username, message.author.avatarURL());
    message.channel.send(Embed);
  }

};