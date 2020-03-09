const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      aliases: ['kittenfact'],
      description: 'Let me tell you a mysterious cat fact.',
      cooldown: 3,
    });
  }

  async run(msg) {
    const fact = await fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(body => body.fact);
    return msg.sendMessage(
      new MessageEmbed()
        .setColor('#0099FF')
        .setDescription(':cat: | ' + fact),
    );
  }

};