const { MessageEmbed } = require('discord.js');
const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, { description: 'Lizard!', cooldown: 3 });
  }

  async run(msg) {
    const image = await fetch('https://nekos.life/api/v2/lizard')
      .then(response => response.json())
      .then(body => body.url);

    msg.channel.send(
      new MessageEmbed()
        .setImage(image)
        .setTitle('Lizard :lizard:')
        .setColor('#0099FF'),
    );
  }
};
