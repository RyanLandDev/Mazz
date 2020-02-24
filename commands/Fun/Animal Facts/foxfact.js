const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Facts about animals that make the awoooooooooooo sound.',
      cooldown: 3,
    });
  }

  async run(msg) {
    const fact = await fetch('https://some-random-api.ml/facts/fox')
      .then(response => response.json())
      .then(body => body.fact);
    return msg.sendMessage(
      new MessageEmbed()
        .setColor('#0099FF')
        .setDescription(':fox: ' + fact),
    );
  }

};