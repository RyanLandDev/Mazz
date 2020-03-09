const { MessageEmbed } = require('discord.js');
const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, { description: 'WOOF WOOF', cooldown: 3 });
  }

  async run(msg) {
    const image = await fetch('https://some-random-api.ml/img/dog')
      .then(response => response.json())
      .then(body => body.link);

    msg.channel.send(
      new MessageEmbed()
        .setImage(image)
        .setTitle('Dog :dog:')
        .setColor('#0099FF'),
    );
  }
};
