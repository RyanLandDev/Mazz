const { MessageEmbed } = require('discord.js');
const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, { description: 'PIKACHUUUU', cooldown: 3, aliases: ['pika'] });
  }

  async run(msg) {
    const image = await fetch('https://some-random-api.ml/pikachuimg')
      .then(response => response.json())
      .then(body => body.link);

    msg.channel.send(
      new MessageEmbed()
        .setImage(image)
        .setTitle('Pikachu :yellow_heart:')
        .setColor('#0099FF'),
    );
  }
};
