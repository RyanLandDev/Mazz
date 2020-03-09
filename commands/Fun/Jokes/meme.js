const { MessageEmbed } = require('discord.js');
const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, { description: 'I got memes.', cooldown: 3 });
  }

  async run(msg) {
    const image = await fetch('https://some-random-api.ml/meme')
      .then(response => response.json())
      .then(body => body.image);

    const caption = await fetch('https://some-random-api.ml/meme')
      .then(response => response.json())
      .then(body => body.caption);

    msg.channel.send(
      new MessageEmbed()
        .setImage(image)
        .setTitle(caption)
        .setColor('#0099FF'),
    );
  }
};
