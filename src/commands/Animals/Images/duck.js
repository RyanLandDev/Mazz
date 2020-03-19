const { MessageEmbed } = require('discord.js');
const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, { description: 'quack!', cooldown: 3 });
  }

  async run(msg) {
    const image = await fetch('https://random-d.uk/api/v2/random')
      .then(response => response.json())
      .then(body => body.url);

    msg.send(
      new MessageEmbed()
        .setImage(image)
        .setTitle('Duck :duck:')
        .setColor('#0099FF'),
    );
  }
};
